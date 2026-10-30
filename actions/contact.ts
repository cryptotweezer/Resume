"use server"

import { z } from "zod"
import nodemailer from "nodemailer"
import arcjet, { validateEmail, fixedWindow, request } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        validateEmail({
            mode: "LIVE",
            block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        }),
        // Cada envio sale de la cuenta de Gmail del sitio: pocos por IP.
        fixedWindow({ mode: "LIVE", window: "10m", max: 3 }),
    ],
});

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
    email: z.string().email({ message: "Please enter a valid email address." }).max(254),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(200),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(5000),
})

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

export type ContactFormState = {
    success: boolean
    message: string
    errors?: {
        name?: string[]
        email?: string[]
        subject?: string[]
        message?: string[]
    }
}

export async function sendContactEmail(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    const validatedFields = contactFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Validation failed. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { name, email, subject, message } = validatedFields.data

    try {
        const req = await request();
        const decision = await aj.protect(req, { email });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    success: false,
                    message: "Too many messages. Please try again in a few minutes.",
                }
            }
            return {
                success: false,
                message: "Invalid email address. Please use a valid, non-disposable email.",
            }
        }

        // Check if environment variables are set
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Missing email credentials in .env file")
            // For development/demo purposes, we'll simulate success if credentials aren't set
            // but log a warning. In production, this should fail.
            if (process.env.NODE_ENV === "development") {
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay
                return {
                    success: true,
                    message: "Email sent successfully! (Simulation: Credentials missing)",
                }
            }
            return {
                success: false,
                message: "Server configuration error. Please try again later.",
            }
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.verify() // Verify connection configuration

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "andreshenao.tech@gmail.com",
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
        })

        return {
            success: true,
            message: "Email sent successfully!",
        }
    } catch (error) {
        console.error("Error sending email:", error)
        return {
            success: false,
            message: "Failed to send the message. Please try again later.",
        }
    }
}

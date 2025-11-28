"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

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
            tls: {
                rejectUnauthorized: false, // Fix for self-signed certificate error in dev
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
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
            message: `Failed to send email: ${(error as Error).message}`,
        }
    }
}

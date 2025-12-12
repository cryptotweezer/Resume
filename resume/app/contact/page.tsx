"use client"

import { useActionState } from "react"
import { useEffect, useRef, useState } from "react"
import { sendContactEmail, ContactFormState } from "@/actions/contact"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"
import { useUser } from "@clerk/nextjs"

const initialState: ContactFormState = {
    success: false,
    message: "",
    errors: {},
}

export default function ContactPage() {
    const [state, formAction, isPending] = useActionState(sendContactEmail, initialState)
    const formRef = useRef<HTMLFormElement>(null)
    const { user, isSignedIn } = useUser()
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
            setEmail(user.primaryEmailAddress.emailAddress)
        }
    }, [isSignedIn, user])

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                formRef.current?.reset()
                // Reset email to user's email if logged in, otherwise empty
                if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
                    setEmail(user.primaryEmailAddress.emailAddress)
                } else {
                    setEmail("")
                }
            } else {
                toast.error(state.message)
            }
        }
    }, [state, isSignedIn, user])

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <section className="mb-12 text-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                    Have a project in mind or want to discuss cybersecurity and AI automation? Send me a message.
                </p>
            </section>

            <Card className="mx-auto max-w-lg bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                    <CardDescription>
                        I&apos;ll get back to you as soon as possible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                minLength={2}
                                aria-describedby="name-error"
                            />
                            {state.errors?.name && (
                                <p id="name-error" className="text-sm text-red-500">
                                    {state.errors.name.join(", ")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your email"
                                required
                                aria-describedby="email-error"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {state.errors?.email && (
                                <p id="email-error" className="text-sm text-red-500">
                                    {state.errors.email.join(", ")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="What is this regarding?"
                                required
                                minLength={5}
                                aria-describedby="subject-error"
                            />
                            {state.errors?.subject && (
                                <p id="subject-error" className="text-sm text-red-500">
                                    {state.errors.subject.join(", ")}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Your message..."
                                required
                                minLength={10}
                                className="min-h-[150px]"
                                aria-describedby="message-error"
                            />
                            {state.errors?.message && (
                                <p id="message-error" className="text-sm text-red-500">
                                    {state.errors.message.join(", ")}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2, Lock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useUI } from "@/context/ui-context";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const { isSignedIn } = useUser();
    const { isChatOpen, setIsChatOpen } = useUI();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Failed to fetch response");

            const data = await response.json();
            const assistantMessage: Message = { role: "assistant", content: data.reply };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn(
            "fixed bottom-4 right-4 z-50",
            isChatOpen && "left-4 sm:left-auto"
        )}>
            {!isChatOpen && (
                <Button
                    onClick={() => setIsChatOpen(true)}
                    className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}

            {isChatOpen && (
                <Card className="w-full sm:w-[350px] h-[500px] max-h-[calc(100dvh-8rem)] flex flex-col shadow-xl border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between p-4 border-b flex-shrink-0">
                        <CardTitle className="text-sm font-bold flex flex-col items-start">
                            <div className="flex items-center gap-1">
                                Hi, I'm <span className="text-blue-500 font-extrabold">Boto</span>
                            </div>
                            <span className="text-xs font-normal text-muted-foreground">Andres Henao's Assistant</span>
                        </CardTitle>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            {isSignedIn && messages.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMessages([])}
                                    disabled={isLoading}
                                    title="Clear messages"
                                    aria-label="Clear messages"
                                    className="h-9 w-9"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="h-9 w-9" aria-label="Close chat">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                        {!isSignedIn ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-background/95 backdrop-blur-sm z-10">
                                <div className="bg-primary/10 p-4 rounded-full mb-4">
                                    <Lock className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Authentication Required</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Please sign in to chat with Boto and ask questions about Andres's work.
                                </p>
                                <div className="flex flex-col gap-3 w-full">
                                    <SignInButton mode="modal">
                                        <Button className="w-full">Sign In</Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button variant="outline" className="w-full">Create Account</Button>
                                    </SignUpButton>
                                </div>
                            </div>
                        ) : (
                            <ScrollArea className="h-full p-4">
                                <div className="flex flex-col gap-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-muted-foreground mt-8">
                                            <p>Welcome! I'm ready to help you.</p>
                                            <p>Ask me anything about Andres's work!</p>
                                        </div>
                                    )}
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex w-full",
                                                msg.role === "user" ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                                    msg.role === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted text-foreground"
                                                )}
                                            >
                                                {msg.role === "user" ? (
                                                    msg.content
                                                ) : (
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600" />
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start w-full">
                                            <div className="bg-muted rounded-lg px-3 py-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        )}
                    </CardContent>
                    <CardFooter className="p-3 border-t flex-shrink-0">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading || !isSignedIn}
                                className="flex-1 h-11"
                            />
                            <Button type="submit" size="icon" className="h-11 w-11 flex-shrink-0" disabled={isLoading || !input.trim() || !isSignedIn}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

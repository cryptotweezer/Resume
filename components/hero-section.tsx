"use client"

import Link from "next/link"
import { useState } from "react"
import { Shield, Cloud, Code2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { RobotModel } from "@/components/robot-model"

export function HeroSection() {
    const [isHoveringResume, setIsHoveringResume] = useState(false)
    const [isHoveringContact, setIsHoveringContact] = useState(false)

    return (
        <section className="w-full min-h-[calc(100vh-4rem)] py-12 flex items-center bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6 lg:px-12 xl:px-24 relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-6">
                        <div className="space-y-6">
                            {/* Name Title */}
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none min-h-[1.2em]">
                                <TypewriterEffect
                                    words={["Andres Henao", "Cyber security", "Web Developer", "AI Automations"]}
                                    cursorClassName="text-blue-500"
                                />
                            </h1>

                            {/* Professional Badges */}
                            {/* Professional Badges */}
                            <div className="grid grid-cols-2 gap-3 w-full max-w-[600px]">
                                <div className="group inline-flex items-center gap-2 px-4 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-500/40">
                                    <Shield className="h-4 w-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-500 group-hover:via-black group-hover:to-neutral-500 dark:group-hover:from-neutral-400 dark:group-hover:via-white dark:group-hover:to-neutral-400 group-hover:bg-[length:200%_auto] group-hover:animate-shine">
                                        Cybersecurity Specialist
                                    </span>
                                </div>
                                <div className="group inline-flex items-center gap-2 px-4 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-500/40">
                                    <Cloud className="h-4 w-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-500 group-hover:via-black group-hover:to-neutral-500 dark:group-hover:from-neutral-400 dark:group-hover:via-white dark:group-hover:to-neutral-400 group-hover:bg-[length:200%_auto] group-hover:animate-shine">
                                        Cloud Security Engineer
                                    </span>
                                </div>
                                <div className="group inline-flex items-center gap-2 px-4 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-500/40">
                                    <Code2 className="h-4 w-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-500 group-hover:via-black group-hover:to-neutral-500 dark:group-hover:from-neutral-400 dark:group-hover:via-white dark:group-hover:to-neutral-400 group-hover:bg-[length:200%_auto] group-hover:animate-shine">
                                        Full-Stack Developer
                                    </span>
                                </div>
                                <div className="group inline-flex items-center gap-2 px-4 py-3 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-500/40">
                                    <Bot className="h-4 w-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300" />
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-500 group-hover:via-black group-hover:to-neutral-500 dark:group-hover:from-neutral-400 dark:group-hover:via-white dark:group-hover:to-neutral-400 group-hover:bg-[length:200%_auto] group-hover:animate-shine">
                                        AI & Automation
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
                                Building secure, intelligent, and efficient systems through cybersecurity expertise, AI automation, and full-stack development.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 min-[400px]:flex-row">
                            <Link href="/about">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                                    onMouseEnter={() => setIsHoveringResume(true)}
                                    onMouseLeave={() => setIsHoveringResume(false)}
                                >
                                    View Full Resume
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onMouseEnter={() => setIsHoveringContact(true)}
                                    onMouseLeave={() => setIsHoveringContact(false)}
                                >
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - 3D Robot Model */}
                    <div className="flex items-center justify-center w-full h-[300px] md:h-[400px] lg:h-[500px]">
                        <RobotModel isHovering={isHoveringResume} isHoveringContact={isHoveringContact} />
                    </div>
                </div>
            </div>
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-white/5 dark:bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
            <div className="absolute inset-0 bg-background/80"></div>
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { experiences } from "@/lib/resume-data"

export function ExperienceRoadmap() {
    const [activeIndices, setActiveIndices] = useState<number[]>([])
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"))
                        if (!isNaN(index)) {
                            setActiveIndices((prev) => {
                                if (prev.includes(index)) return prev
                                return [...prev, index]
                            })
                        }
                    }
                })
            },
            { threshold: 0.1, rootMargin: "-50px" }
        )

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref)
            })
        }
    }, [])

    return (
        <div className="relative space-y-12 before:hidden md:before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
            {experiences.map((exp, index) => {
                const isActive = activeIndices.includes(index)
                const isEven = index % 2 === 0

                return (
                    <div
                        key={index}
                        ref={(el) => { itemRefs.current[index] = el }}
                        data-index={index}
                        className={cn(
                            "relative flex items-center justify-center md:justify-normal group transition-all duration-700 ease-out",
                            isEven ? "md:flex-row" : "md:flex-row-reverse",
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        )}
                    >
                        {/* Icon - Absolutely positioned in center for desktop */}
                        <div className={cn(
                            "hidden md:flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow-sm z-10 transition-all duration-500 delay-100",
                            "md:absolute md:-translate-x-1/2",
                            isEven ? "md:left-[calc(50%-3rem)]" : "md:left-[calc(50%+3rem)]",
                            isActive ? "border-blue-500 bg-blue-500/10 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "border-muted-foreground/20"
                        )}>
                            <Briefcase className={cn(
                                "h-5 w-5 transition-colors duration-300",
                                isActive ? "text-blue-400" : "text-muted-foreground"
                            )} />
                        </div>

                        {/* Spacer for desktop alignment */}
                        <div className="hidden md:block md:w-1/2" />

                        {/* Content Card */}
                        <div className={cn(
                            "w-full md:w-[calc(50%-3rem)] bg-card/50 backdrop-blur-sm p-6 rounded-xl border shadow-sm transition-all duration-500 ml-0 md:ml-0",
                            isEven ? "md:mr-12" : "md:ml-12",
                            isActive ? "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "border-border"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <h3 className={cn(
                                    "font-bold text-lg transition-colors duration-300",
                                    isActive ? "text-blue-400" : "text-foreground"
                                )}>
                                    {exp.title}
                                </h3>
                                <time className="flex items-center text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full w-fit">
                                    <Calendar className="h-3.5 w-3.5 mr-2 text-blue-400" />
                                    {exp.period}
                                </time>
                            </div>

                            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                <Briefcase className="h-4 w-4" />
                                <span className="font-medium text-foreground">{exp.company}</span>
                                <span className="mx-1">•</span>
                                <MapPin className="h-4 w-4" />
                                <span>{exp.location}</span>
                            </div>

                            <ul className="space-y-2">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
    decimals?: number
    className?: string
}

export function CountUp({
    end,
    duration = 2000,
    suffix = "",
    prefix = "",
    decimals = 0,
    className = ""
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const countRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.3 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current)
            }
        }
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number | null = null
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (ease out)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentCount = easeOut * end

            setCount(currentCount)

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [isVisible, end, duration])

    return (
        <div ref={countRef} className={className}>
            {prefix}{count.toFixed(decimals)}{suffix}
        </div>
    )
}

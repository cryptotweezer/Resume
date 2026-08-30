"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterEffectProps {
    words: string[]
    className?: string
    cursorClassName?: string
}

export function TypewriterEffect({ words, className, cursorClassName }: TypewriterEffectProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [currentText, setCurrentText] = useState(words[0] ?? "")
    const [isDeleting, setIsDeleting] = useState(false)
    const [typingSpeed, setTypingSpeed] = useState(200)

    useEffect(() => {
        const handleTyping = () => {
            const fullText = words[currentWordIndex]

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1))
                setTypingSpeed(100) // Slower deleting
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1))
                setTypingSpeed(200) // Slower typing
            }

            if (!isDeleting && currentText === fullText) {
                // Finished typing word, wait longer before deleting
                setTimeout(() => setIsDeleting(true), 6000)
            } else if (isDeleting && currentText === "") {
                // Finished deleting, move to next word
                setIsDeleting(false)
                setCurrentWordIndex((prev) => (prev + 1) % words.length)
            }
        }

        const timer = setTimeout(handleTyping, typingSpeed)
        return () => clearTimeout(timer)
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed])

    // Split text into first word and the rest
    const firstSpaceIndex = currentText.indexOf(' ')
    let firstPart = currentText
    let secondPart = ""

    if (firstSpaceIndex !== -1) {
        firstPart = currentText.substring(0, firstSpaceIndex)
        secondPart = currentText.substring(firstSpaceIndex)
    }

    return (
        <span className={cn("inline-block", className)}>
            <span className="text-foreground">{firstPart}</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">{secondPart}</span>
            <span className={cn("ml-1 border-r-2 border-blue-500", cursorClassName, isDeleting ? "opacity-100 animate-pulse" : "opacity-0")}></span>
        </span>
    )
}

"use client"

import React, { createContext, useContext, useState } from "react"

interface UIContextType {
    isHoveringAuth: boolean
    setIsHoveringAuth: (value: boolean) => void
    isChatOpen: boolean
    setIsChatOpen: (value: boolean) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isHoveringAuth, setIsHoveringAuth] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)

    return (
        <UIContext.Provider value={{ isHoveringAuth, setIsHoveringAuth, isChatOpen, setIsChatOpen }}>
            {children}
        </UIContext.Provider>
    )
}

export function useUI() {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error("useUI must be used within a UIProvider")
    }
    return context
}

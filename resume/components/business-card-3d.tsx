"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, Float, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"


function CardContent({ theme }: { theme: string | undefined }) {
    const groupRef = useRef<THREE.Group>(null)

    // Logos
    const logoSrc = theme === 'light' ? "/logo_black.png" : "/logo_white.png"

    useFrame((state) => {
        if (!groupRef.current) return

        // Scroll Rotation Logic
        const scrollY = window.scrollY
        const isMobile = window.innerWidth < 768

        // On mobile, the logo is further down (stacked below text). 
        // We subtract an offset so rotation starts "later" (when it comes into view)
        // rather than immediately from top of page.
        const startOffset = isMobile ? 600 : 0
        const effectiveScroll = Math.max(0, scrollY - startOffset)

        const rotationSpeed = 0.003
        const targetRotationY = effectiveScroll * rotationSpeed

        // Smooth lerp
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotationY,
            0.1
        )

        // Gentle floating
        const t = state.clock.getElapsedTime()
        groupRef.current.position.y = Math.sin(t / 1.5) * 0.1
    })

    return (
        <group ref={groupRef}>
            {/* Just the Logo in 3D Space */}
            <Html
                transform
                zIndexRange={[20, 0]}
                occlude="blending"
                position={[0, 0, 0]}
                style={{
                    width: '300px',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backfaceVisibility: 'visible', // Visible from both sides? Or separate back?
                    userSelect: 'none'
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={logoSrc}
                    alt="Logo"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </Html>
        </group>
    )
}

export function BusinessCard3D() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-[500px] w-full" />

    return (
        <div className="w-full h-[500px] relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, 10, -10]} intensity={1} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <group scale={0.5}>
                        <CardContent theme={resolvedTheme} />
                    </group>
                </Float>
            </Canvas>
        </div>
    )
}

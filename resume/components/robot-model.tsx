"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

import { useUI } from "@/context/ui-context"

function Robot({ url, isHovering, isHoveringContact }: { url: string, isHovering: boolean, isHoveringContact: boolean }) {
    const { scene } = useGLTF(url)
    const modelRef = useRef<THREE.Group>(null)
    const [scale, setScale] = useState(3.8)
    const [position, setPosition] = useState<[number, number, number]>([0, -0.5, 0])
    const [baseY, setBaseY] = useState(-0.5)

    // const [isShaking, setIsShaking] = useState(false) // Removed shake
    const [isSpinning, setIsSpinning] = useState(false)
    const spinProgress = useRef(0)
    const initialSpinRotation = useRef(0)
    const { isHoveringAuth, isChatOpen } = useUI()
    const [isJumping, setIsJumping] = useState(false)
    const jumpProgress = useRef(0)

    useEffect(() => {
        if (isChatOpen) {
            setIsJumping(true)
            jumpProgress.current = 0
        }
    }, [isChatOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale(3.8) // Mobile
                setBaseY(-0.5)
                setPosition([0, -0.5, 0])
            } else if (window.innerWidth < 1024) {
                setScale(5.5) // Tablet/Laptop
                setBaseY(-0.3)
                setPosition([0, -0.3, 0])
            } else {
                setScale(7.0) // Desktop
                setBaseY(0.2)
                setPosition([0, 0.2, 0])
            }
        }

        handleResize() // Set initial scale
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position (-1 to 1) based on window size
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const handleDoubleClick = () => {
        if (!isSpinning && modelRef.current) {
            initialSpinRotation.current = modelRef.current.rotation.y
            spinProgress.current = 0
            setIsSpinning(true)
        }
    }

    // Rotate model to face mouse and animate eyes
    useFrame((state, delta) => {
        if (modelRef.current) {
            // Target rotation based on global mouse position
            const targetRotationY = mouse.current.x * 0.8 // Increased range for better visibility
            const targetRotationX = -mouse.current.y * 0.5 // Increased range

            if (isJumping) {
                // Jump animation
                jumpProgress.current += delta * 10 // Speed of jump
                // Sine wave for jumping (0 to PI is one hump)
                const jumpHeight = 0.5
                const jumpY = Math.sin(jumpProgress.current) * jumpHeight

                if (jumpY >= 0) {
                    modelRef.current.position.y = baseY + jumpY
                } else {
                    // Jump finished
                    setIsJumping(false)
                    modelRef.current.position.y = baseY
                }

                // Maintain mouse tracking during jump
                modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1)
                modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.1)

                modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1)
                modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.1)

            } else if (isSpinning) {
                // 360-degree spin animation
                spinProgress.current += delta * 15 // Adjust speed here

                if (spinProgress.current >= Math.PI * 2) {
                    // Spin complete
                    setIsSpinning(false)
                    // Reset rotation to avoid unwinding (subtract 360 deg)
                    modelRef.current.rotation.y = (initialSpinRotation.current + spinProgress.current) - (Math.PI * 2)
                } else {
                    modelRef.current.rotation.y = initialSpinRotation.current + spinProgress.current
                }

                // Return pitch to neutral during spin
                modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, 0, 0.1)
            } else if (isHoveringAuth) {
                // "Yes" nod animation
                const time = state.clock.getElapsedTime()
                // Sine wave for nodding (up and down) added to the mouse target
                const nodOffset = Math.sin(time * 8) * 0.1

                // Follow mouse horizontally
                modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1)
                // Follow mouse vertically BUT add the nod offset
                modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX + nodOffset, 0.1)
            } else {
                // Smoothly interpolate to target (normal mouse tracking)
                modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1)
                modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.1)
            }

            // Bounce animation logic (only if NOT jumping)
            if (!isJumping) {
                if (isHoveringContact) {
                    // Create a bounce effect using sine wave
                    const time = state.clock.getElapsedTime()
                    const bounce = Math.abs(Math.sin(time * 5)) * 0.2 // Small bounce height
                    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, baseY + bounce, 0.2)
                } else {
                    // Reset position smoothly
                    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, baseY, 0.1)
                }
            }

            // Animate eyes
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh
                    const material = mesh.material as THREE.MeshStandardMaterial

                    // Check if the mesh or material name contains "eye" (case insensitive)
                    const isEye = mesh.name.toLowerCase().includes("eye") || material.name.toLowerCase().includes("eye")

                    if (isEye && material.emissive) {
                        // Base emissive color (blue-ish default)
                        const baseColor = new THREE.Color("#0088ff")
                        // Hover color (purple/violet as requested)
                        const hoverColor = new THREE.Color("#ac00fc")

                        // Interpolate color
                        material.emissive.lerp(isHovering ? hoverColor : baseColor, 0.1)

                        // Interpolate intensity
                        // Reduced from 20 to 5 to prevent color from blowing out to white
                        material.toneMapped = false
                        const targetIntensity = isHovering ? 5 : 2
                        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.1)

                        // Ensure scale is reset if it was modified previously
                        mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
                    }
                }
            })
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <primitive
                object={scene}
                ref={modelRef}
                scale={scale}
                position={position}
                rotation={[0, 0, 0]}
                onDoubleClick={handleDoubleClick}
            />
        </Float>
    )
}

function SceneContent({ isHovering, isHoveringContact }: { isHovering: boolean, isHoveringContact: boolean }) {
    const [isDragging, setIsDragging] = useState(false)
    const controlsRef = useRef<any>(null)
    const { camera } = useThree()

    useFrame((state, delta) => {
        if (!isDragging && controlsRef.current) {
            // Smoothly reset camera position to default [0, 0, 6]
            const targetPos = new THREE.Vector3(0, 0, 6)
            camera.position.lerp(targetPos, delta * 3)

            // Prevent zoom effect by maintaining constant distance
            if (camera.position.length() > 0.1) {
                camera.position.setLength(6)
            }

            // Smoothly reset controls target to [0, 0, 0]
            const targetCenter = new THREE.Vector3(0, 0, 0)
            controlsRef.current.target.lerp(targetCenter, delta * 3)

            controlsRef.current.update()
        }
    })

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, -10, -10]} intensity={0.5} />
            <Environment preset="city" />

            <Robot url="/robot.glb" isHovering={isHovering} isHoveringContact={isHoveringContact} />

            <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.5}
                onStart={() => setIsDragging(true)}
                onEnd={() => setIsDragging(false)}
            />
        </>
    )
}

export function RobotModel({ isHovering = false, isHoveringContact = false }: { isHovering?: boolean, isHoveringContact?: boolean }) {
    return (
        <div className="w-full h-full min-h-[400px] relative">
            <Canvas>
                <SceneContent isHovering={isHovering} isHoveringContact={isHoveringContact} />
            </Canvas>
        </div>
    )
}

// Preload the model
useGLTF.preload("/robot.glb")

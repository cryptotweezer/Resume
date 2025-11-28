"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function Robot({ url }: { url: string }) {
    const { scene } = useGLTF(url)
    const modelRef = useRef<THREE.Group>(null)
    const [scale, setScale] = useState(3.8)
    const [position, setPosition] = useState<[number, number, number]>([0, -0.5, 0])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale(3.8) // Mobile
                setPosition([0, -0.5, 0])
            } else if (window.innerWidth < 1024) {
                setScale(5.5) // Tablet/Laptop
                setPosition([0, -0.3, 0])
            } else {
                setScale(7.0) // Desktop
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

    // Rotate model to face mouse
    useFrame((state) => {
        if (modelRef.current) {
            // Target rotation based on global mouse position
            const targetRotationY = mouse.current.x * 0.8 // Increased range for better visibility
            const targetRotationX = -mouse.current.y * 0.5 // Increased range

            // Smoothly interpolate to target
            modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1)
            modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotationX, 0.1)
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
            />
        </Float>
    )
}

function SceneContent() {
    const [isDragging, setIsDragging] = useState(false)
    const controlsRef = useRef<any>(null)
    const { camera } = useThree()

    useFrame((state, delta) => {
        if (!isDragging && controlsRef.current) {
            // Smoothly reset camera position to default [0, 0, 6]
            const targetPos = new THREE.Vector3(0, 0, 6)
            camera.position.lerp(targetPos, delta * 3)

            // Prevent zoom effect by maintaining constant distance
            // Only apply if we are close to the target distance to avoid snapping
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

            <Robot url="/robot.glb" />

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

export function RobotModel() {
    return (
        <div className="w-full h-full min-h-[400px] relative">
            <Canvas>
                <SceneContent />
            </Canvas>
        </div>
    )
}

// Preload the model
useGLTF.preload("/robot.glb")

"use client"

import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Shape, ExtrudeGeometry } from "three"
import { useTheme } from "next-themes"

const Box = ({ position, rotation, isLightMode }: { position: [number, number, number]; rotation: [number, number, number]; isLightMode: boolean }) => {
  const shape = React.useMemo(() => {
    const s = new Shape()
    const angleStep = Math.PI * 0.5
    const radius = 1
    s.absarc(2, 2, radius, angleStep * 0, angleStep * 1)
    s.absarc(-2, 2, radius, angleStep * 1, angleStep * 2)
    s.absarc(-2, -2, radius, angleStep * 2, angleStep * 3)
    s.absarc(2, -2, radius, angleStep * 3, angleStep * 4)
    return s
  }, [])

  const geometry = React.useMemo(() => {
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 6,
    }
    const geom = new ExtrudeGeometry(shape, extrudeSettings)
    geom.center()
    return geom
  }, [shape])

  return (
    <mesh geometry={geometry} position={position} rotation={rotation}>
      <meshPhysicalMaterial
        color={isLightMode ? "#ffffff" : "#0a0a0c"}
        metalness={0.1}
        roughness={0.3}
        reflectivity={0.8}
        ior={1.4}
        emissive="#000000"
        emissiveIntensity={0}
        transparent={true}
        opacity={0.85}
        transmission={0.8}
        thickness={1.0}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
      />
    </mesh>
  )
}

const AnimatedBoxes = ({ isLightMode, isVisible }: { isLightMode: boolean; isVisible: boolean }) => {
  const groupRef = useRef<import("three").Group>(null)
  
  useFrame((_, delta) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.x += delta * 0.04
    }
  })

  // Optimized 30 box count framed tightly for high resolution and zoomed-out viewports
  const boxes = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, index) => ({
      position: [(index - 15) * 0.65, 0, 0] as [number, number, number],
      rotation: [(index - 10) * 0.12, Math.PI / 2, 0] as [number, number, number],
      id: index,
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {boxes.map((box) => (
        <Box key={box.id} position={box.position} rotation={box.rotation} isLightMode={isLightMode} />
      ))}
    </group>
  )
}

export const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Intersection Observer to pause 3D rendering when Hero is out of screen viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const isLightMode = mounted && resolvedTheme === "light"

  return (
    <div ref={containerRef} className="w-full h-full z-0 pointer-events-none">
      {isVisible && (
        <Canvas camera={{ position: [5, 5, 20], fov: 40 }} gl={{ powerPreference: "high-performance", antialias: false }}>
          <ambientLight intensity={10} />
          <directionalLight position={[10, 10, 5]} intensity={10} />
          <AnimatedBoxes isLightMode={isLightMode} isVisible={isVisible} />
        </Canvas>
      )}
    </div>
  )
}

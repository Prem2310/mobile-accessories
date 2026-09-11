import { ContactShadows, Float, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

/**
 * A single grounded product cluster — phone+case front and center, accessories tucked close
 * behind it — rather than primitives scattered across the frame. Gentle mouse parallax on the
 * whole group; each piece floats at a shared, unhurried rhythm so it reads as one still-life,
 * not independent toys.
 */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null)
  const { viewport } = useThree()
  useFrame((state) => {
    if (!group.current) return
    const x = (state.pointer.x * viewport.width) / 55
    const y = (state.pointer.y * viewport.height) / 55
    group.current.rotation.y += (x - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-y * 0.4 - group.current.rotation.x) * 0.04
  })
  return (
    <group ref={group} rotation={[0.08, -0.35, 0]}>
      {children}
    </group>
  )
}

function Phone() {
  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
      {/* thin orange rim so the case edge separates from the dark background */}
      <RoundedBox args={[1.19, 2.34, 0.13]} radius={0.16} smoothness={4} position={[0, 0.1, -0.02]}>
        <meshStandardMaterial color="#f26a00" metalness={0.3} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[1.15, 2.3, 0.15]} radius={0.15} smoothness={4} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#0a2153" metalness={0.5} roughness={0.25} />
      </RoundedBox>
      {/* lit screen — an "on" device reads instantly against a dark hero */}
      <mesh position={[0, 0.1, 0.076]}>
        <planeGeometry args={[0.98, 2.1]} />
        <meshStandardMaterial color="#6f8bd6" emissive="#3a5cc4" emissiveIntensity={0.55} metalness={0.2} roughness={0.35} />
      </mesh>
    </Float>
  )
}

function Charger() {
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[-1.05, 0.75, -0.55]} rotation={[0.35, 0.5, 0.1]}>
        <boxGeometry args={[0.5, 0.5, 0.26]} />
        <meshStandardMaterial color="#f26a00" metalness={0.25} roughness={0.35} />
      </mesh>
    </Float>
  )
}

function Earbud({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={position}>
        <capsuleGeometry args={[0.14, 0.28, 8, 16]} />
        <meshStandardMaterial color="#f5f7fb" metalness={0.1} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function CableLoop() {
  return (
    <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.45}>
      <mesh position={[1.15, -0.65, -0.3]} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[0.3, 0.055, 12, 32]} />
        <meshStandardMaterial color="#2b4fa0" metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0.6, 0.3, 5.2], fov: 38 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.55} />
      {/* one warm key light — echoes the shop's own orange signage — plus a cool neutral fill */}
      <directionalLight position={[3, 4, 4]} intensity={1.5} color="#ffb37a" />
      <directionalLight position={[-2, -1, 3]} intensity={0.35} color="#c3ceE6" />
      <Rig>
        <Phone />
        <Charger />
        <Earbud position={[1.05, 0.85, 0.35]} />
        <Earbud position={[1.3, 0.6, 0.45]} />
        <CableLoop />
      </Rig>
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={6} blur={2.6} far={2} color="#020a1f" />
    </Canvas>
  )
}

import { Float, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

/** Floating mobile-accessory silhouettes (stylized primitives — no product scans were supplied), with gentle mouse parallax. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null)
  const { viewport } = useThree()
  useFrame((state) => {
    if (!group.current) return
    const x = (state.pointer.x * viewport.width) / 40
    const y = (state.pointer.y * viewport.height) / 40
    group.current.rotation.y += (x - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-y - group.current.rotation.x) * 0.04
  })
  return <group ref={group}>{children}</group>
}

function Phone() {
  const ref = useRef<Mesh>(null)
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <RoundedBox ref={ref} args={[1.1, 2.2, 0.14]} radius={0.14} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a2153" metalness={0.3} roughness={0.35} />
      </RoundedBox>
    </Float>
  )
}

function Charger() {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.6}>
      <mesh position={[-1.6, 1, -0.6]} rotation={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.55, 0.55, 0.3]} />
        <meshStandardMaterial color="#f26a00" metalness={0.2} roughness={0.4} />
      </mesh>
    </Float>
  )
}

function Earbud({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh position={position}>
        <capsuleGeometry args={[0.16, 0.32, 8, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function PowerBank() {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <RoundedBox args={[0.7, 1.3, 0.22]} radius={0.1} position={[1.7, -0.8, -0.4]} rotation={[0, -0.4, 0.15]}>
        <meshStandardMaterial color="#2b4fa0" metalness={0.4} roughness={0.3} />
      </RoundedBox>
    </Float>
  )
}

function CableLoop() {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh position={[1.4, 1.3, 0.3]} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[0.32, 0.06, 12, 32]} />
        <meshStandardMaterial color="#f26a00" metalness={0.2} roughness={0.5} />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#f26a00" />
      <Rig>
        <Phone />
        <Charger />
        <Earbud position={[-1.5, -1, 0.4]} />
        <Earbud position={[-1.9, -1.3, 0.4]} />
        <PowerBank />
        <CableLoop />
      </Rig>
    </Canvas>
  )
}

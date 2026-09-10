import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FallbackHero } from './FallbackHero'

const Scene3D = lazy(() => import('./Scene3D').then((m) => ({ default: m.Scene3D })))

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

/** 3D hero on capable desktops; a lightweight 2.5D CSS composition everywhere else (reduced motion, no WebGL, or still loading). */
export function HeroScene() {
  const reduceMotion = useReducedMotion()
  const [webglOk, setWebglOk] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglOk(hasWebGL())
  }, [])

  const use3D = !reduceMotion && webglOk

  if (!use3D) {
    return <FallbackHero />
  }

  return (
    <div style={{ aspectRatio: '1/1', maxWidth: 420 }} className="max-md:hidden">
      <Suspense fallback={<FallbackHero />}>
        <Scene3D />
      </Suspense>
    </div>
  )
}

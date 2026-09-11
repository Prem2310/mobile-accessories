import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from '../../components/ds/Icon'

/**
 * CSS/Framer-Motion 2.5D composition — used when WebGL is unavailable, or always under
 * prefers-reduced-motion. Mirrors Scene3D's grounded still-life: one phone card front and
 * center, two accessory chips tucked close behind it, sitting on a soft glow — not icons
 * scattered independently across the frame.
 */
export function FallbackHero() {
  const reduce = useReducedMotion()
  const float = (delay: number) => (reduce ? undefined : { y: [0, -10, 0], transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay } })

  return (
    <div style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 420 }} className="max-md:hidden">
      {/* ground glow, echoes the 3D scene's contact shadow + warm key light */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '6%',
          width: '70%',
          height: '18%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(242,106,0,.35), transparent 72%)',
          filter: 'blur(2px)',
        }}
      />

      <motion.div
        animate={float(0)}
        style={{
          position: 'absolute',
          top: '10%',
          left: '30%',
          width: 78,
          height: 30,
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.05))',
          backdropFilter: 'blur(6px)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 12px 24px rgba(6,23,56,.3)',
        }}
      >
        <Icon name="battery-charging" size={20} color="var(--orange-400)" />
      </motion.div>

      <motion.div
        animate={float(0.6)}
        style={{
          position: 'absolute',
          top: '18%',
          right: '20%',
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.06))',
          backdropFilter: 'blur(6px)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 10px 20px rgba(6,23,56,.3)',
        }}
      >
        <Icon name="headphones" size={16} color="var(--white)" />
      </motion.div>

      {/* the phone card, front and center */}
      <motion.div
        animate={float(0.2)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 148,
          height: 288,
          borderRadius: 30,
          background: 'linear-gradient(160deg, #132d68, #0a2153)',
          border: '1px solid rgba(255,255,255,.12)',
          boxShadow: '0 30px 60px rgba(2,10,31,.55), inset 0 1px 0 rgba(255,255,255,.08)',
        }}
      >
        <div style={{ position: 'absolute', inset: 10, borderRadius: 22, background: 'linear-gradient(160deg, rgba(255,255,255,.06), transparent 60%)' }} />
      </motion.div>

      <motion.div
        animate={float(0.9)}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '14%',
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '10px solid rgba(43,79,160,.55)',
          boxShadow: '0 12px 24px rgba(6,23,56,.3)',
        }}
      />
    </div>
  )
}

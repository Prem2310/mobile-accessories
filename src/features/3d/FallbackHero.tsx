import { motion, useReducedMotion } from 'framer-motion'
import { Icon, type IconName } from '../../components/ds/Icon'

/** CSS/Framer-Motion 2.5D composition — used when WebGL is unavailable, or always under prefers-reduced-motion. */
export function FallbackHero() {
  const reduce = useReducedMotion()
  const items: { icon: IconName; top: string; left: string; size: number; delay: number }[] = [
    { icon: 'smartphone', top: '10%', left: '30%', size: 64, delay: 0 },
    { icon: 'battery-charging', top: '55%', left: '8%', size: 48, delay: 0.4 },
    { icon: 'headphones', top: '15%', left: '68%', size: 52, delay: 0.8 },
    { icon: 'zap', top: '65%', left: '62%', size: 44, delay: 1.2 },
    { icon: 'cable', top: '40%', left: '45%', size: 40, delay: 1.6 },
  ]
  return (
    <div style={{ position: 'relative', aspectRatio: '1/1', maxWidth: 420 }} className="max-md:hidden">
      {items.map((it) => (
        <motion.div
          key={it.icon}
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: it.delay }}
          style={{
            position: 'absolute',
            top: it.top,
            left: it.left,
            width: it.size,
            height: it.size,
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255,255,255,.08)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 12px 30px rgba(6,23,56,.35)',
          }}
        >
          <Icon name={it.icon} size={it.size * 0.45} color="var(--orange-400)" />
        </motion.div>
      ))}
    </div>
  )
}

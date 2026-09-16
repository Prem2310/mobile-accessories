import { motion, useReducedMotion } from 'framer-motion'

/**
 * Full-screen boot loader shown while the catalog loads from Supabase (see main.tsx).
 * Monochrome, on-brand with the rest of the storefront: the logo pulses in and a thin
 * bar sweeps under it — then the whole panel wipes up on exit (AnimatePresence in
 * main.tsx) to reveal the loaded app underneath.
 */
export function AppLoader() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
      }}
    >
      <motion.img
        src="/images/logo/logo-black.webp"
        alt="Raghav"
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: [0.9, 1.04, 1], y: 0 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ width: 148, height: 'auto' }}
      />

      <div style={{ width: 120, height: 1, background: '#e2e2e2', overflow: 'hidden', position: 'relative' }}>
        {!reduce && (
          <motion.div
            animate={{ x: ['-40%', '250%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: '#000' }}
          />
        )}
      </div>
    </motion.div>
  )
}

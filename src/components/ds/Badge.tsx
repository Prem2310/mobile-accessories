import type { CSSProperties, ReactNode } from 'react'

export type BadgeTone = 'sale' | 'new' | 'trend' | 'stock' | 'out' | 'info' | 'warn'

export interface BadgeProps {
  tone?: BadgeTone
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

/* Monochrome badges: solid black for the tones that should grab the eye (sale, out of
   stock), white-with-black-border for informational ones — same two pill styles the
   landing page uses for "Best seller" vs "Just in". */
const map: Record<BadgeTone, { bg: string; fg: string; border?: string }> = {
  sale: { bg: 'var(--ink-900)', fg: 'var(--white)' },
  new: { bg: 'var(--white)', fg: 'var(--ink-900)', border: '1px solid var(--ink-900)' },
  trend: { bg: 'var(--white)', fg: 'var(--ink-900)', border: '1px solid var(--ink-900)' },
  stock: { bg: 'var(--white)', fg: 'var(--ink-900)', border: '1px solid var(--ink-900)' },
  out: { bg: 'var(--ink-900)', fg: 'var(--white)' },
  info: { bg: 'var(--gray-100)', fg: 'var(--gray-800)' },
  warn: { bg: 'var(--white)', fg: 'var(--ink-900)', border: '1px solid var(--ink-900)' },
}

export function Badge({ tone = 'sale', children, style, className }: BadgeProps) {
  const t = map[tone] ?? map.info
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sp-1)',
        background: t.bg,
        color: t.fg,
        border: t.border,
        font: 'var(--type-label)',
        letterSpacing: 'var(--ls-wide)',
        textTransform: 'uppercase',
        padding: '5px 10px',
        borderRadius: 'var(--radius-xs)',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

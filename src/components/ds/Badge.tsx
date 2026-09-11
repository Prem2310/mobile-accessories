import type { CSSProperties, ReactNode } from 'react'

export type BadgeTone = 'sale' | 'new' | 'trend' | 'stock' | 'out' | 'info' | 'warn'

export interface BadgeProps {
  tone?: BadgeTone
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

/* "sale"/"new"/"trend" hex values match the reference site's own status-badge colors
   (Hot #fc5732, New #48d4bb, Trend #83b735), not the app's ink/orange accent tokens. */
const map: Record<BadgeTone, { bg: string; fg: string }> = {
  sale: { bg: '#fc5732', fg: 'var(--white)' },
  new: { bg: '#48d4bb', fg: 'var(--white)' },
  trend: { bg: '#83b735', fg: 'var(--white)' },
  stock: { bg: 'var(--green-100)', fg: 'var(--green-600)' },
  out: { bg: 'var(--red-100)', fg: 'var(--red-600)' },
  info: { bg: 'var(--gray-100)', fg: 'var(--gray-800)' },
  warn: { bg: 'var(--amber-100)', fg: 'var(--amber-600)' },
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

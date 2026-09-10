import type { CSSProperties } from 'react'

export interface PriceProps {
  amount: number
  mrp?: number
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
  className?: string
}

const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN')

export function Price({ amount, mrp, size = 'md', style, className }: PriceProps) {
  const fs = { sm: 'var(--fs-base)', md: 'var(--fs-h3)', lg: 'var(--fs-h2)' }[size]
  const off = mrp && mrp > amount ? Math.round((1 - amount / mrp) * 100) : null
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'var(--sp-2)', ...style }}>
      <span style={{ font: `var(--fw-bold) ${fs}/1.1 var(--font-body)`, color: 'var(--price)' }}>{fmt(amount)}</span>
      {mrp != null && mrp > amount && (
        <span style={{ font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--price-strike)', textDecoration: 'line-through' }}>{fmt(mrp)}</span>
      )}
      {off != null && off > 0 && <span style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--save)' }}>{off}% off</span>}
    </span>
  )
}

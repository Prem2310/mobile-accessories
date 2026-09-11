import type { CSSProperties, ReactNode } from 'react'

export interface OfferBannerProps {
  title: ReactNode
  subtitle?: ReactNode
  cta?: ReactNode
  tone?: 'navy' | 'orange'
  style?: CSSProperties
  className?: string
}

export function OfferBanner({ title, subtitle, cta, tone = 'navy', style, className }: OfferBannerProps) {
  const navy = tone === 'navy'
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--sp-6)',
        padding: 'var(--sp-6) var(--sp-8)',
        borderRadius: 'var(--radius-lg)',
        background: navy ? 'var(--surface-dark)' : 'var(--orange-500)',
        color: 'var(--white)',
        ...style,
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-h3)/1.15 var(--font-display)' }}>{title}</div>
        {subtitle && <div style={{ font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: navy ? 'var(--gray-300)' : 'var(--orange-100)' }}>{subtitle}</div>}
      </div>
      {cta}
    </div>
  )
}

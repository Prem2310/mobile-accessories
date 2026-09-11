import type { CSSProperties, ReactNode } from 'react'

export interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  style?: CSSProperties
  className?: string
}

/**
 * Section titles carry hierarchy through size and weight alone — no eyebrow label above the
 * heading. An eyebrow restating the heading ("Trending" over "Trending now") is decoration, not
 * information; `subtitle` exists for when a section genuinely needs a second line of context.
 */
export function SectionHeading({ title, subtitle, action, align = 'left', tone = 'light', style, className }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: align === 'center' ? 'center' : 'space-between',
        gap: 'var(--sp-4)',
        marginBottom: 'var(--sp-5)',
        textAlign: align,
        ...style,
      }}
    >
      <div>
        <h2 style={{ font: '800 clamp(22px, 2.6vw, 30px)/1.15 var(--font-display)', letterSpacing: '-0.01em', color: dark ? 'var(--white)' : 'var(--text-strong)' }}>{title}</h2>
        {subtitle && <p style={{ marginTop: 'var(--sp-1)', font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: dark ? 'var(--navy-200)' : 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

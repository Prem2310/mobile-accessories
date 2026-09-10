import type { CSSProperties, ReactNode } from 'react'

export interface SectionHeadingProps {
  eyebrow?: ReactNode
  title: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  style?: CSSProperties
  className?: string
}

export function SectionHeading({ eyebrow, title, action, align = 'left', tone = 'light', style, className }: SectionHeadingProps) {
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
        {eyebrow && (
          <div
            style={{
              font: 'var(--type-label)',
              letterSpacing: 'var(--ls-caps)',
              textTransform: 'uppercase',
              color: 'var(--orange-500)',
              marginBottom: 'var(--sp-2)',
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2 style={{ font: 'var(--type-h2)', color: dark ? 'var(--white)' : 'var(--text-strong)' }}>{title}</h2>
      </div>
      {action}
    </div>
  )
}

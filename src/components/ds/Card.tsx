import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

export interface CardProps {
  padding?: string
  interactive?: boolean
  tone?: 'light' | 'dark'
  children?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler
}

export function Card({ padding = 'var(--sp-5)', interactive = false, tone = 'light', children, style, className, onClick }: CardProps) {
  const [hover, setHover] = useState(false)
  const dark = tone === 'dark'
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        background: dark ? 'var(--surface-dark)' : 'var(--surface-card)',
        color: dark ? 'var(--text-on-dark)' : 'var(--text-body)',
        border: '1px solid ' + (dark ? 'transparent' : 'var(--border-subtle)'),
        borderRadius: 'var(--radius-lg)',
        padding,
        boxShadow: interactive && hover ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        transform: interactive && hover ? 'var(--lift-hover)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

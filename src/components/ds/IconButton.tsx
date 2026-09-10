import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

export type IconButtonTone = 'neutral' | 'brand' | 'onDark'

export interface IconButtonProps {
  label: string
  tone?: IconButtonTone
  size?: number
  active?: boolean
  children?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler
}

export function IconButton({ label, tone = 'neutral', size = 44, active = false, children, style, className, onClick }: IconButtonProps) {
  const [hover, setHover] = useState(false)
  const tones: Record<IconButtonTone, { color: string; bg: string }> = {
    neutral: { color: 'var(--navy-800)', bg: hover ? 'var(--gray-100)' : 'transparent' },
    brand: { color: hover ? 'var(--white)' : 'var(--orange-500)', bg: hover ? 'var(--orange-500)' : 'var(--orange-50)' },
    onDark: { color: 'var(--white)', bg: hover ? 'rgba(255,255,255,.16)' : 'transparent' },
  }
  const t = tones[tone]
  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-pill)',
        border: active ? '1.5px solid var(--orange-500)' : '1.5px solid transparent',
        background: t.bg,
        color: t.color,
        cursor: 'pointer',
        transition: 'var(--transition-control)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

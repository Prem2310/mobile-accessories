import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

export interface TagProps {
  selected?: boolean
  onClick?: MouseEventHandler
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export function Tag({ selected = false, onClick, children, style, className }: TagProps) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)',
        padding: '0 var(--sp-4)',
        height: 'var(--control-sm)',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        transition: 'var(--transition-control)',
        border: '1.5px solid ' + (selected ? 'var(--ink-900)' : 'var(--border-default)'),
        background: selected ? 'var(--ink-900)' : hover ? 'var(--gray-50)' : 'var(--white)',
        color: selected ? 'var(--white)' : 'var(--ink-900)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

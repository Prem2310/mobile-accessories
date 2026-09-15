import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler
}

const base: CSSProperties = {
  font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--sp-2)',
  border: '1.5px solid transparent',
  borderRadius: 'var(--radius-pill)',
  cursor: 'pointer',
  transition: 'var(--transition-control)',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
}
const sizes: Record<ButtonSize, CSSProperties> = {
  sm: { height: 'var(--control-sm)', padding: '0 var(--sp-4)', fontSize: 'var(--fs-sm)' },
  md: { height: 'var(--control-md)', padding: '0 var(--sp-6)' },
  lg: { height: 'var(--control-lg)', padding: '0 var(--sp-8)', fontSize: 'var(--fs-lg)' },
}
const variants: Record<ButtonVariant, CSSProperties> = {
  primary: { background: 'transparent', color: 'var(--ink-900)', borderColor: 'var(--ink-900)' },
  secondary: { background: 'var(--ink-900)', color: 'var(--white)' },
  outline: { background: 'transparent', color: 'var(--ink-900)', borderColor: 'var(--ink-900)' },
  ghost: { background: 'transparent', color: 'var(--ink-900)' },
  whatsapp: { background: 'var(--whatsapp)', color: 'var(--white)' },
}
const hovers: Record<ButtonVariant, CSSProperties> = {
  primary: { background: 'var(--ink-900)', color: 'var(--white)' },
  secondary: { background: 'var(--ink-700)' },
  outline: { background: 'var(--gray-50)' },
  ghost: { background: 'var(--gray-100)' },
  whatsapp: { background: 'var(--whatsapp-dark)' },
}

/** Primary action control. Outline pill (black border/text) = the dominant Ecomus CTA style, fills solid black on hover; secondary is solid black by default; WhatsApp variant is monochrome too (order-on-chat), just a darker-on-hover black pill instead of brand green. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  children,
  style,
  className,
  onClick,
}: ButtonProps) {
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  const computed: CSSProperties = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    width: fullWidth ? '100%' : undefined,
    transform: disabled ? undefined : pressed ? 'var(--press-scale)' : hover ? 'var(--lift-hover)' : 'none',
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style,
  }

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false)
      setPressed(false)
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  }

  if (as === 'a') {
    return (
      <a href={href} target={target} rel={rel} style={computed} className={className} onClick={onClick} {...handlers}>
        {iconLeft}
        {children}
        {iconRight}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} style={computed} className={className} onClick={onClick} {...handlers}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

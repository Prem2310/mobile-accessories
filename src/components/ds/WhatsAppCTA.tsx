import { useState, type CSSProperties } from 'react'
import { Icon } from './Icon'

export interface WhatsAppCTAProps {
  phone?: string
  message?: string
  label?: string
  floating?: boolean
  style?: CSSProperties
  className?: string
}

export function WhatsAppCTA({
  phone = '919999999999',
  message = 'Hi Raghav Mobile Accessories, I want to order:',
  label = 'Order on WhatsApp',
  floating = false,
  style,
  className,
}: WhatsAppCTAProps) {
  const [hover, setHover] = useState(false)
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  const pos: CSSProperties = floating ? { position: 'fixed', right: 'var(--sp-6)', bottom: 'var(--sp-6)', zIndex: 50 } : {}
  const elevationShadow = style?.boxShadow ?? (floating ? 'var(--shadow-hover)' : undefined)
  const boxShadow = hover ? [elevationShadow, 'inset 0 0 0 1px #000'].filter(Boolean).join(', ') : elevationShadow
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        height: 'var(--control-lg)',
        padding: '0 var(--sp-6)',
        borderRadius: 'var(--radius-pill)',
        background: hover ? '#fff' : 'var(--whatsapp)',
        color: hover ? '#000' : 'var(--white)',
        font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)',
        textDecoration: 'none',
        transition: 'var(--transition-control)',
        transform: hover ? 'var(--lift-hover)' : 'none',
        ...pos,
        ...style,
        boxShadow,
      }}
    >
      <Icon name="message-circle" size={20} />
      {label}
    </a>
  )
}

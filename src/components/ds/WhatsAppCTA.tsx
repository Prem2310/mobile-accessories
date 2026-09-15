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
  const pos: CSSProperties = floating
    ? { position: 'fixed', right: 'var(--sp-6)', bottom: 'var(--sp-6)', zIndex: 50, boxShadow: 'var(--shadow-hover)' }
    : {}
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
        background: hover ? '#333' : '#000',
        color: '#fff',
        font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)',
        textDecoration: 'none',
        transition: 'var(--transition-control)',
        transform: hover ? 'var(--lift-hover)' : 'none',
        ...pos,
        ...style,
      }}
    >
      <Icon name="message-circle" size={20} />
      {label}
    </a>
  )
}

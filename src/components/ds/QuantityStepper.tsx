import type { CSSProperties } from 'react'

export interface QuantityStepperProps {
  value?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  style?: CSSProperties
  className?: string
}

const btnStyle: CSSProperties = {
  width: 36,
  height: 36,
  border: 0,
  background: 'transparent',
  color: 'var(--navy-800)',
  font: 'var(--fw-bold) 18px/1 var(--font-body)',
  cursor: 'pointer',
  borderRadius: 'var(--radius-pill)',
}

export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, style, className }: QuantityStepperProps) {
  const set = (v: number) => onChange?.(Math.min(max, Math.max(min, v)))
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sp-1)',
        padding: '3px',
        border: '1.5px solid var(--border-default)',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--white)',
        ...style,
      }}
    >
      <button type="button" style={btnStyle} aria-label="Decrease" onClick={() => set(value - 1)}>
        −
      </button>
      <span style={{ minWidth: 28, textAlign: 'center', font: 'var(--fw-bold) var(--fs-base)/1 var(--font-mono)', color: 'var(--text-strong)' }}>{value}</span>
      <button type="button" style={btnStyle} aria-label="Increase" onClick={() => set(value + 1)}>
        +
      </button>
    </div>
  )
}

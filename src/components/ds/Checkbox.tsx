import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'type'> {
  label?: ReactNode
  checked?: boolean
  count?: number
  style?: CSSProperties
}

export function Checkbox({ label, checked = false, count, style, ...rest }: CheckboxProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        cursor: 'pointer',
        minHeight: 'var(--tap-min)',
        font: 'var(--type-body)',
        color: 'var(--text-body)',
        ...style,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          flex: '0 0 auto',
          borderRadius: 'var(--radius-xs)',
          display: 'grid',
          placeItems: 'center',
          border: '1.5px solid ' + (checked ? 'var(--orange-500)' : 'var(--border-default)'),
          background: checked ? 'var(--orange-500)' : 'var(--white)',
          transition: 'var(--transition-control)',
        }}
      >
        {checked && (
          <span
            style={{
              width: 10,
              height: 6,
              borderLeft: '2px solid #fff',
              borderBottom: '2px solid #fff',
              transform: 'rotate(-45deg) translateY(-1px)',
            }}
          />
        )}
      </span>
      <input type="checkbox" checked={checked} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{ flex: 1 }}>{label}</span>
      {count != null && <span style={{ color: 'var(--text-faint)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-mono)' }}>{count}</span>}
    </label>
  )
}

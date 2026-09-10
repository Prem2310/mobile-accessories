import type { CSSProperties, ReactNode, SelectHTMLAttributes } from 'react'

export type SelectOption = string | { value: string; label: string }

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  label?: ReactNode
  options?: SelectOption[]
  style?: CSSProperties
}

export function Select({ label, options = [], style, ...rest }: SelectProps) {
  return (
    <label style={{ display: 'block', ...style }}>
      {label && (
        <span style={{ display: 'block', font: 'var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>
          {label}
        </span>
      )}
      <select
        style={{
          width: '100%',
          height: 'var(--control-md)',
          padding: '0 var(--sp-4)',
          background: 'var(--white)',
          border: '1.5px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          font: 'var(--type-body)',
          color: 'var(--text-strong)',
          cursor: 'pointer',
          appearance: 'none',
        }}
        {...rest}
      >
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value
          const l = typeof o === 'string' ? o : o.label
          return (
            <option key={v} value={v}>
              {l}
            </option>
          )
        })}
      </select>
    </label>
  )
}

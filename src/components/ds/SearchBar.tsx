import { useState, type ChangeEventHandler, type CSSProperties } from 'react'
import { Icon } from './Icon'

export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSubmit?: (value: string | undefined) => void
  autoFocus?: boolean
  style?: CSSProperties
  className?: string
}

export function SearchBar({ placeholder = 'Search covers, glass, chargers…', value, onChange, onSubmit, autoFocus, style, className }: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value)
      }}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--sp-3)',
        height: 'var(--control-md)',
        padding: '0 var(--sp-3) 0 var(--sp-4)',
        background: 'var(--white)',
        borderRadius: 'var(--radius-pill)',
        border: '1.5px solid ' + (focused ? 'var(--ink-900)' : 'transparent'),
        boxShadow: focused ? 'var(--ring-brand)' : 'var(--shadow-card)',
        transition: 'var(--transition-control)',
        ...style,
      }}
    >
      <Icon name="search" size={18} color="var(--gray-400)" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ flex: 1, border: 0, outline: 0, background: 'transparent', font: 'var(--type-body)', color: 'var(--text-strong)', minWidth: 0 }}
      />
      <button
        type="submit"
        style={{
          height: 34,
          padding: '0 var(--sp-4)',
          border: 0,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--ink-900)',
          color: 'var(--white)',
          font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  )
}

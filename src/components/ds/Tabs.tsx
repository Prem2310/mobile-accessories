import type { CSSProperties } from 'react'

export type TabItem = string | { value: string; label: string }

export interface TabsProps {
  items?: TabItem[]
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
  className?: string
}

export function Tabs({ items = [], value, onChange, style, className }: TabsProps) {
  return (
    <div role="tablist" className={className} style={{ display: 'flex', gap: 'var(--sp-6)', borderBottom: '1px solid var(--border-subtle)', ...style }}>
      {items.map((it) => {
        const v = typeof it === 'string' ? it : it.value
        const l = typeof it === 'string' ? it : it.label
        const on = v === value
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange?.(v)}
            style={{
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
              padding: '0 0 var(--sp-3)',
              font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)',
              color: on ? 'var(--navy-800)' : 'var(--text-muted)',
              borderBottom: '3px solid ' + (on ? 'var(--orange-500)' : 'transparent'),
              marginBottom: -1,
              transition: 'var(--transition-control)',
            }}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}

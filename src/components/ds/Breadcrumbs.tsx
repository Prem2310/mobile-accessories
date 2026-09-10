import { Fragment, type CSSProperties } from 'react'

export type BreadcrumbItem = string | { label: string; href?: string }

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  style?: CSSProperties
  className?: string
}

export function Breadcrumbs({ items = [], style, className }: BreadcrumbsProps) {
  return (
    <nav
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexWrap: 'wrap', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-muted)', ...style }}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1
        const label = typeof it === 'string' ? it : it.label
        const href = typeof it === 'string' ? undefined : it.href
        return (
          <Fragment key={i}>
            {last ? (
              <span style={{ color: 'var(--text-strong)', fontWeight: 'var(--fw-bold)' }}>{label}</span>
            ) : (
              <a href={href ?? '#'} style={{ color: 'var(--text-muted)', fontWeight: 'var(--fw-medium)' }}>
                {label}
              </a>
            )}
            {!last && <span style={{ color: 'var(--text-faint)' }}>/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}

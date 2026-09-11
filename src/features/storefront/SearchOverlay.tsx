import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { Price } from '../../components/ds/Price'
import { getCategories, getProducts } from '../../lib/catalog'

export interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

/** Slide-in search panel: quick category links + live product suggestions as you type. Original implementation over real catalog data. */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const categories = useMemo(() => getCategories().slice(0, 4), [])
  const suggestions = useMemo(() => (query.trim() ? getProducts({ query: query.trim() }).slice(0, 5) : getProducts({ sort: 'bestselling' }).slice(0, 4)), [query])

  const submit = () => {
    navigate(`/shop?q=${encodeURIComponent(query)}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 60 }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(400px, 92vw)', background: 'var(--white)', zIndex: 61, display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-hover)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ font: 'var(--fw-bold) var(--fs-lg)/1 var(--font-body)', color: 'var(--ink-900)' }}>Search our site</div>
              <button onClick={onClose} aria-label="Close search" style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
                <Icon name="x" size={22} color="var(--ink-900)" />
              </button>
            </div>

            <div style={{ padding: 'var(--sp-4) var(--sp-5)' }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  submit()
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px', border: '1.5px solid var(--border-default)', borderRadius: 999 }}
              >
                <Icon name="search" size={16} color="var(--gray-400)" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by phone model, product…"
                  style={{ flex: 1, border: 0, outline: 0, font: 'var(--type-body)', color: 'var(--text-strong)' }}
                />
              </form>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--sp-5) var(--sp-5)' }}>
              {!query.trim() && (
                <>
                  <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', marginBottom: 10 }}>Quick links</div>
                  <div style={{ display: 'grid', gap: 4, marginBottom: 'var(--sp-5)' }}>
                    {categories.map((c) => (
                      <Link key={c.id} to={`/shop?category=${c.slug}`} onClick={onClose} style={{ padding: '6px 0', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none' }}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', marginBottom: 10 }}>
                {query.trim() ? `Results for "${query}"` : 'Popular right now'}
              </div>
              {suggestions.length === 0 && <p style={{ color: 'var(--text-muted)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)' }}>No products match that search.</p>}
              <div style={{ display: 'grid', gap: 'var(--sp-3)' }}>
                {suggestions.map((p) => (
                  <Link key={p.id} to={`/products/${p.slug}`} onClick={onClose} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', textDecoration: 'none' }}>
                    <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
                      {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ font: 'var(--fw-semibold) var(--fs-sm)/1.3 var(--font-body)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                      <Price amount={p.price} mrp={p.mrp} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

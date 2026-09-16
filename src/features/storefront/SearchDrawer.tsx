import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { getBestsellers, getCategories, getDisplayPrice, getProducts } from '../../lib/catalog'
import { formatINR } from '../../lib/format'
import { useSearchStore } from '../../store/search'

/** Slide-in search panel — quick category links and a couple of bestsellers when the box is
    empty, live product results once you start typing. Mirrors CartDrawer's slide-in pattern. */
export function SearchDrawer() {
  const isOpen = useSearchStore((s) => s.isOpen)
  const close = useSearchStore((s) => s.close)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  const categories = getCategories().slice(0, 6)
  const inspiration = getBestsellers(3)
  const results = query.trim() ? getProducts({ query: query.trim() }).slice(0, 6) : []

  const goToProduct = (slug: string) => {
    close()
    navigate(`/products/${slug}`)
  }

  const goToCategory = (slug: string) => {
    close()
    navigate(`/shop?category=${slug}`)
  }

  const submitSearch = () => {
    if (!query.trim()) return
    close()
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 60 }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(440px, 100vw)',
              background: '#fff',
              zIndex: 61,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #000' }}>
              <div style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#000' }}>
                Search our site
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                style={{ border: 0, background: 'transparent', cursor: 'pointer', width: 32, height: 32, display: 'grid', placeItems: 'center' }}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitSearch()
              }}
              style={{ padding: '20px 24px 0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #000', borderRadius: 999, padding: '12px 18px' }}>
                <Icon name="search" size={18} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by product or phone model…"
                  style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontFamily: 'Archivo, sans-serif', fontSize: 15, color: '#000', minWidth: 0 }}
                />
              </div>
            </form>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'grid', gap: 28, alignContent: 'start' }}>
              {query.trim() ? (
                <div style={{ display: 'grid', gap: 4 }}>
                  {results.length === 0 ? (
                    <p style={{ color: '#666', fontFamily: 'Archivo, sans-serif', fontSize: 14 }}>No products found for &ldquo;{query}&rdquo;.</p>
                  ) : (
                    results.map((p) => {
                      const { price, mrp } = getDisplayPrice(p)
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => goToProduct(p.slug)}
                          style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', border: 0, borderBottom: '1px solid #eee', background: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                        >
                          <div style={{ width: 52, height: 52, flex: '0 0 auto', borderRadius: 8, background: '#f2f2f2', overflow: 'hidden' }}>
                            {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 14, color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                            <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, color: '#666' }}>
                              {formatINR(price)}
                              {mrp && mrp > price && <span style={{ textDecoration: 'line-through', marginLeft: 6, color: '#999' }}>{formatINR(mrp)}</span>}
                            </div>
                          </div>
                        </button>
                      )
                    })
                  )}
                  {results.length > 0 && (
                    <button
                      type="button"
                      onClick={submitSearch}
                      style={{ marginTop: 8, border: '1px solid #000', borderRadius: 999, padding: '12px 20px', background: '#000', color: '#fff', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}
                    >
                      See all results for &ldquo;{query}&rdquo;
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gap: 14 }}>
                    <div style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 14, textTransform: 'uppercase', color: '#000' }}>Quick links</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => goToCategory(c.slug)}
                          style={{ border: 0, background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'Archivo, sans-serif', fontSize: 15, color: '#333' }}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 14 }}>
                    <div style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 14, textTransform: 'uppercase', color: '#000' }}>Need some inspiration?</div>
                    <div style={{ display: 'grid', gap: 4 }}>
                      {inspiration.map((p) => {
                        const { price, mrp } = getDisplayPrice(p)
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => goToProduct(p.slug)}
                            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', border: 0, borderBottom: '1px solid #eee', background: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                          >
                            <div style={{ width: 52, height: 52, flex: '0 0 auto', borderRadius: 8, background: '#f2f2f2', overflow: 'hidden' }}>
                              {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 14, color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                              <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, color: '#666' }}>
                                {formatINR(price)}
                                {mrp && mrp > price && <span style={{ textDecoration: 'line-through', marginLeft: 6, color: '#999' }}>{formatINR(mrp)}</span>}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

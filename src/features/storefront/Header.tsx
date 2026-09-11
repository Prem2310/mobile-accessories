import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { IconButton } from '../../components/ds/IconButton'
import { formatINR } from '../../lib/format'
import { getBestsellers, getCategories, getSiteSettings } from '../../lib/catalog'
import { useCartCount, useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from './SearchOverlay'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop', hasDropdown: true },
  { to: '/shop?sort=newest', label: 'New Arrivals' },
  { to: '/shop?sort=bestselling', label: 'Best Sellers' },
  { to: '/offers', label: 'Offers' },
]

export function Header() {
  const settings = getSiteSettings()
  const categories = getCategories()
  const bestsellers = getBestsellers(3)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useCartCount()
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const openCart = useCartStore((s) => s.open)

  return (
    <>
      <div className="hidden md:block" style={{ background: 'var(--gray-50)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '9px var(--gutter)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="map-pin" size={13} />
            {settings.area} · {settings.hours}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 20 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="truck" size={13} />
              Free delivery over {settings.freeDeliveryThreshold}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="instagram" size={13} />
              {settings.instagramHandle}
            </span>
          </span>
        </div>
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-page" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 'var(--sp-4)', padding: 'var(--sp-4) var(--gutter)' }}>
          <button
            className="flex lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ gridColumn: 1, justifySelf: 'start', border: 0, background: 'none', cursor: 'pointer', padding: 8, marginLeft: -8 }}
          >
            <Icon name="menu" size={22} color="var(--ink-900)" />
          </button>

          <nav className="hidden lg:flex" style={{ gap: 'var(--sp-5)', gridColumn: 1 }}>
            {NAV_LINKS.map((l) =>
              l.hasDropdown ? (
                <div key={l.label} style={{ position: 'relative' }} onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                  <Link to={l.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>
                    {l.label}
                    <Icon name="chevron-down" size={14} />
                  </Link>
                  {shopOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: -12,
                        background: 'var(--white)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-hover)',
                        padding: 'var(--sp-5)',
                        display: 'flex',
                        gap: 'var(--sp-8)',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(150px, 1fr))', gap: '4px var(--sp-6)', alignContent: 'start' }}>
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            to={`/shop?category=${c.slug}`}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 4px', borderRadius: 'var(--radius-sm)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                          >
                            <Icon name={c.icon ?? 'package'} size={16} color="var(--gray-400)" />
                            {c.name}
                          </Link>
                        ))}
                      </div>
                      {bestsellers.length > 0 && (
                        <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'var(--sp-6)', minWidth: 200 }}>
                          <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--ls-caps)', marginBottom: 12 }}>Best sellers</div>
                          <div style={{ display: 'grid', gap: 12 }}>
                            {bestsellers.map((p) => (
                              <Link key={p.id} to={`/products/${p.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                                <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
                                  {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>{p.title}</div>
                                  <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--price)' }}>{formatINR(p.price)}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.label} to={l.to} style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <Link to="/" style={{ textDecoration: 'none', textAlign: 'center', gridColumn: 2 }}>
            <div style={{ font: '800 26px/1 var(--font-display)', color: 'var(--navy-900)', letterSpacing: '-.02em' }}>
              Ragh<span style={{ color: 'var(--orange-500)' }}>a</span>v
            </div>
            <div style={{ font: 'var(--fw-bold) 9px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>
              Mobile Accessories
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifySelf: 'end', gridColumn: 3 }}>
            <IconButton label="Search" tone="neutral" onClick={() => setSearchOpen(true)}>
              <Icon name="search" />
            </IconButton>
            <Link to="/wishlist" style={{ position: 'relative' }}>
              <IconButton label="Wishlist" tone="neutral">
                <Icon name="heart" />
              </IconButton>
              {wishlistCount > 0 && <CountBadge value={wishlistCount} />}
            </Link>
            <span style={{ position: 'relative' }}>
              <IconButton label="Cart" tone="neutral" onClick={openCart}>
                <Icon name="shopping-bag" />
              </IconButton>
              {cartCount > 0 && <CountBadge value={cartCount} />}
            </span>
          </div>
        </div>

      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} categories={categories} settings={settings} />
    </>
  )
}

function CountBadge({ value }: { value: number }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 2,
        right: 0,
        minWidth: 18,
        height: 18,
        borderRadius: 999,
        background: 'var(--orange-500)',
        color: '#fff',
        font: 'var(--fw-bold) 10px/18px var(--font-body)',
        textAlign: 'center',
        padding: '0 4px',
      }}
    >
      {value}
    </span>
  )
}

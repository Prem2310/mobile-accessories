import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { IconButton } from '../../components/ds/IconButton'
import { SearchBar } from '../../components/ds/SearchBar'
import { getCategories, getSiteSettings } from '../../lib/catalog'
import { useCartCount, useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop', hasDropdown: true },
  { to: '/shop?sort=newest', label: 'New Arrivals' },
  { to: '/shop?sort=bestselling', label: 'Best Sellers' },
  { to: '/offers', label: 'Offers' },
]

export function Header() {
  const settings = getSiteSettings()
  const categories = getCategories()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
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
                    <div style={{ position: 'absolute', top: '100%', left: -12, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-hover)', padding: 'var(--sp-2)', minWidth: 200, display: 'grid' }}>
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/shop?category=${c.slug}`}
                          style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none' }}
                        >
                          {c.name}
                        </Link>
                      ))}
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
            <IconButton label="Search" tone="neutral" onClick={() => setSearchOpen((v) => !v)}>
              <Icon name={searchOpen ? 'x' : 'search'} />
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

        {searchOpen && (
          <div className="container-page" style={{ padding: '0 var(--gutter) var(--sp-4)' }}>
            <SearchBar
              placeholder="Search by phone model…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={(v) => {
                navigate(`/shop?q=${encodeURIComponent(v ?? '')}`)
                setSearchOpen(false)
              }}
              style={{ maxWidth: 480, margin: '0 auto' }}
            />
          </div>
        )}
      </header>

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

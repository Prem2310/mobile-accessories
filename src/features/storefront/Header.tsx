import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { IconButton } from '../../components/ds/IconButton'
import { SearchBar } from '../../components/ds/SearchBar'
import { getSiteSettings } from '../../lib/catalog'
import { useCartCount, useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/shop?sort=newest', label: 'New Arrivals' },
  { to: '/shop?sort=bestselling', label: 'Best Sellers' },
  { to: '/offers', label: 'Offers' },
]

export function Header() {
  const settings = getSiteSettings()
  const [query, setQuery] = useState('')
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
        <div className="container-page" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-6)', padding: 'var(--sp-4) var(--gutter)' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ font: '800 26px/1 var(--font-display)', color: 'var(--navy-900)', letterSpacing: '-.02em' }}>
              Ragh<span style={{ color: 'var(--orange-500)' }}>a</span>v
            </div>
            <div style={{ font: 'var(--fw-bold) 9px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 4 }}>
              Mobile Accessories
            </div>
          </Link>

          <div className="hidden md:block" style={{ flex: 1, maxWidth: 440 }}>
            <SearchBar
              placeholder="Search by phone model…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={(v) => navigate(`/shop?q=${encodeURIComponent(v ?? '')}`)}
            />
          </div>

          <nav className="hidden lg:flex" style={{ gap: 'var(--sp-5)', marginLeft: 'auto' }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.to} style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none', padding: '8px 0' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }} className="lg:ml-0">
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

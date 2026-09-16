import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon, type IconName } from '../../components/ds/Icon'
import { useCartCount, useCartStore } from '../../store/cart'
import { useSearchStore } from '../../store/search'
import { useWishlistStore } from '../../store/wishlist'

const navItemStyle = (active: boolean): CSSProperties => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  padding: '10px 0',
  minHeight: 'var(--tap-min)',
  border: 0,
  background: 'transparent',
  textDecoration: 'none',
  color: active ? 'var(--ink-900)' : 'var(--gray-600)',
  position: 'relative',
})

function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span style={{ position: 'absolute', top: 4, right: '28%', minWidth: 14, height: 14, borderRadius: 999, background: '#000', color: '#fff', font: 'var(--fw-bold) 9px/14px var(--font-body)', textAlign: 'center' }}>
      {count}
    </span>
  )
}

const links: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Home', icon: 'store' },
  { to: '/shop', label: 'Shop', icon: 'shopping-bag' },
]

export function MobileBottomNav() {
  const location = useLocation()
  const cartCount = useCartCount()
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const openCart = useCartStore((s) => s.open)
  const openSearch = useSearchStore((s) => s.open)

  return (
    <nav
      className="md:hidden flex"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'var(--white)',
        borderTop: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sticky)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {links.map((it) => {
        const active = it.to === '/' ? location.pathname === '/' : location.pathname === it.to
        return (
          <Link key={it.label} to={it.to} style={navItemStyle(active)}>
            <Icon name={it.icon} size={20} color={active ? 'var(--ink-900)' : 'var(--gray-600)'} />
            <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>{it.label}</span>
          </Link>
        )
      })}

      <button type="button" onClick={openSearch} style={navItemStyle(false)}>
        <Icon name="search" size={20} color="var(--gray-600)" />
        <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>Search</span>
      </button>

      <Link to="/wishlist" style={navItemStyle(location.pathname === '/wishlist')}>
        <Icon name="heart" size={20} color={location.pathname === '/wishlist' ? 'var(--ink-900)' : 'var(--gray-600)'} />
        <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>Wishlist</span>
        <NavBadge count={wishlistCount} />
      </Link>

      <button type="button" onClick={openCart} style={navItemStyle(false)}>
        <Icon name="shopping-bag" size={20} color="var(--gray-600)" />
        <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>Cart</span>
        <NavBadge count={cartCount} />
      </button>
    </nav>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { Icon, type IconName } from '../../components/ds/Icon'
import { useCartCount, useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'

const items: { to: string; label: string; icon: IconName }[] = [
  { to: '/', label: 'Home', icon: 'store' },
  { to: '/shop', label: 'Shop', icon: 'shopping-bag' },
  { to: '/shop?focusSearch=1', label: 'Search', icon: 'search' },
  { to: '/wishlist', label: 'Wishlist', icon: 'heart' },
]

export function MobileBottomNav() {
  const location = useLocation()
  const cartCount = useCartCount()
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const openCart = useCartStore((s) => s.open)

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
      {items.map((it) => {
        const active = location.pathname === it.to.split('?')[0] && (it.to === '/' ? location.pathname === '/' : true)
        const count = it.icon === 'heart' ? wishlistCount : undefined
        return (
          <Link
            key={it.label}
            to={it.to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '10px 0',
              minHeight: 'var(--tap-min)',
              textDecoration: 'none',
              color: active ? 'var(--ink-900)' : 'var(--gray-600)',
              position: 'relative',
            }}
          >
            <Icon name={it.icon} size={20} color={active ? 'var(--ink-900)' : 'var(--gray-600)'} />
            <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>{it.label}</span>
            {count != null && count > 0 && (
              <span style={{ position: 'absolute', top: 4, right: '28%', minWidth: 14, height: 14, borderRadius: 999, background: '#000', color: '#fff', font: 'var(--fw-bold) 9px/14px var(--font-body)', textAlign: 'center' }}>
                {count}
              </span>
            )}
          </Link>
        )
      })}
      <button
        type="button"
        onClick={openCart}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 0', border: 0, background: 'transparent', color: 'var(--gray-600)', position: 'relative' }}
      >
        <Icon name="shopping-bag" size={20} color="var(--gray-600)" />
        <span style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)' }}>Cart</span>
        {cartCount > 0 && (
          <span style={{ position: 'absolute', top: 4, right: '28%', minWidth: 14, height: 14, borderRadius: 999, background: '#000', color: '#fff', font: 'var(--fw-bold) 9px/14px var(--font-body)', textAlign: 'center' }}>
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  )
}

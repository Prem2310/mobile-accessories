import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { useCartCount, useCartStore } from '../../store/cart'
import { useSearchStore } from '../../store/search'

const NAV_LINKS = [
  { to: '/#shop', label: 'Shop' },
  { to: '/#deals', label: 'Deals' },
  { to: '/#arrivals', label: 'New' },
  { to: '/#visit', label: 'Instagram' },
  { to: '/#visit', label: 'Visit' },
]

const navLinkStyle: CSSProperties = {
  fontFamily: 'Archivo, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#000',
  textDecoration: 'none',
}

export function Header() {
  const cartCount = useCartCount()
  const openCart = useCartStore((s) => s.open)
  const openSearch = useSearchStore((s) => s.open)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 24,
        padding: '16px 28px',
        background: '#fff',
        borderBottom: '1px solid #000',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', textDecoration: 'none' }}>
        <img src="/images/logo/logo-black.webp" alt="Raghav" style={{ height: 'clamp(24px, 6vw, 32px)', width: 'auto', maxWidth: 160, display: 'block' }} />
      </Link>

      <nav className="hidden lg:flex" style={{ gap: 28 }}>
        {NAV_LINKS.map((l, i) => (
          <Link key={l.label + i} to={l.to} style={navLinkStyle}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search products"
          className="lp-cart-pill"
          style={{ width: 40, height: 40, border: '1px solid #000', background: '#fff', borderRadius: '50%', display: 'grid', placeItems: 'center', flex: '0 0 auto', cursor: 'pointer' }}
        >
          <Icon name="search" size={17} />
        </button>

        <button
          type="button"
          onClick={openCart}
          className="lp-cart-pill"
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: '1px solid #000',
            background: '#fff',
            color: '#000',
            padding: '10px 16px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
          }}
        >
          Cart · {cartCount}
        </button>
      </div>

      <button
        type="button"
        onClick={openCart}
        className="md:hidden lp-cart-pill"
        style={{
          fontFamily: 'Archivo, sans-serif',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          border: '1px solid #000',
          background: '#fff',
          color: '#000',
          padding: '10px 16px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
      >
        Cart · {cartCount}
      </button>
    </header>
  )
}

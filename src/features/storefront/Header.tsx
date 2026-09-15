import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useCartCount, useCartStore } from '../../store/cart'

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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{ width: 26, height: 26, background: '#000', borderRadius: '50%', flex: 'none' }} />
        <span style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 18, letterSpacing: '-0.02em', color: '#000' }}>RAGHAV</span>
      </Link>

      <nav className="hidden lg:flex" style={{ gap: 28 }}>
        {NAV_LINKS.map((l, i) => (
          <Link key={l.label + i} to={l.to} style={navLinkStyle}>
            {l.label}
          </Link>
        ))}
      </nav>

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
    </header>
  )
}

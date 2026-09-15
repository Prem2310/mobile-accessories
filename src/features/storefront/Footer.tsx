import { Link } from 'react-router-dom'
import { getSiteSettings } from '../../lib/catalog'

const shopLinks = [
  { label: 'Cases', to: '/shop?category=cases' },
  { label: 'Tempered glass', to: '/shop?category=glass' },
  { label: 'Chargers', to: '/shop?category=charging' },
  { label: 'Audio', to: '/shop?category=audio' },
]
const helpLinks = [
  { label: 'Offers', to: '/offers' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'All categories', to: '/categories' },
]

const linkStyle = { color: '#fff', fontFamily: 'Archivo, sans-serif', fontSize: 14, textDecoration: 'none' } as const
const headerStyle = { fontFamily: 'Archivo, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#777' } as const

export function Footer() {
  const settings = getSiteSettings()
  return (
    <footer style={{ background: '#000', color: '#fff', padding: '48px 28px 28px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, background: '#fff', borderRadius: '50%' }} />
            <span style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 16 }}>RAGHAV</span>
          </div>
          <p style={{ margin: 0, fontFamily: 'Archivo, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#9c9c9c', maxWidth: '30ch' }}>
            Mobile accessories, fitted and tested in {settings.area || 'Vastral'} since 2017.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={headerStyle}>Shop</span>
          {shopLinks.map((l) => (
            <Link key={l.label} to={l.to} style={linkStyle}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={headerStyle}>Help</span>
          {helpLinks.map((l) => (
            <Link key={l.label} to={l.to} style={linkStyle}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={headerStyle}>Follow</span>
          {settings.instagramHandle && (
            <a href={`https://www.instagram.com/${settings.instagramHandle.replace('@', '')}/`} target="_blank" rel="noopener" style={linkStyle}>
              Instagram
            </a>
          )}
          {settings.whatsappNumber && (
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener" style={linkStyle}>
              WhatsApp
            </a>
          )}
          {settings.area && (
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(settings.area)}`} target="_blank" rel="noopener" style={linkStyle}>
              Google Maps
            </a>
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #333',
          paddingTop: 18,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          fontFamily: 'Archivo, sans-serif',
          fontSize: 12,
          color: '#777',
        }}
      >
        <span>© {new Date().getFullYear()} {settings.storeName}</span>
        <span>{settings.area || 'Vastral · Ahmedabad · Gujarat'}</span>
      </div>
    </footer>
  )
}

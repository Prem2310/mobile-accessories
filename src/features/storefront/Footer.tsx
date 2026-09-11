import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { getSiteSettings } from '../../lib/catalog'

const columns: { title: string; items: { label: string; to: string }[] }[] = [
  {
    title: 'Shop',
    items: [
      { label: 'All products', to: '/shop' },
      { label: 'Categories', to: '/categories' },
      { label: 'New arrivals', to: '/shop?sort=newest' },
      { label: 'Offers', to: '/offers' },
    ],
  },
]

export function Footer() {
  const settings = getSiteSettings()
  return (
    <footer style={{ background: 'var(--ink-900)', marginTop: 'var(--sp-20)' }}>
      <div className="container-page" style={{ padding: 'var(--sp-12) var(--gutter)', display: 'grid', gap: 'var(--sp-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div>
          <div style={{ font: '800 24px/1 var(--font-display)', color: '#fff' }}>
            Ragh<span style={{ color: 'var(--orange-500)' }}>a</span>v
          </div>
          <p style={{ marginTop: 12, font: 'var(--fw-medium) var(--fs-sm)/1.6 var(--font-body)', color: 'var(--gray-300)', maxWidth: 280 }}>
            Your neighbourhood mobile accessories shop in {settings.area}. Covers, glass, chargers and more.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <a href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" style={socialIconStyle}>
              <Icon name="instagram" size={18} />
            </a>
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" style={socialIconStyle}>
              <Icon name="message-circle" size={18} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: '#fff', marginBottom: 14 }}>{col.title}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {col.items.map((it) => (
                <Link key={it.label} to={it.to} style={{ font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--gray-300)', textDecoration: 'none' }}>
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: '#fff', marginBottom: 14 }}>Visit us</div>
          <div style={{ display: 'grid', gap: 10, font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--gray-300)' }}>
            <span>{settings.area}</span>
            <span>{settings.hours}</span>
            <span>+91 {settings.whatsappNumber.slice(2, 7)} {settings.whatsappNumber.slice(7)}</span>
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: '#fff', marginBottom: 14 }}>Get in touch</div>
          <p style={{ font: 'var(--fw-medium) var(--fs-sm)/1.5 var(--font-body)', color: 'var(--gray-300)', marginBottom: 12 }}>
            Message us on WhatsApp for stock, prices or an order — usually replies within minutes.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 18px', borderRadius: 999, background: '#fff', color: 'var(--ink-900)', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', textDecoration: 'none' }}
          >
            <Icon name="message-circle" size={16} />
            Message us
          </a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,.12)' }}>
        <div
          className="container-page"
          style={{ padding: '16px var(--gutter)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', color: 'var(--gray-300)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}
        >
          <span>© {new Date().getFullYear()} {settings.storeName}</span>
          {settings.gstNumber && <span>GST {settings.gstNumber} · Made in Ahmedabad</span>}
        </div>
      </div>
    </footer>
  )
}

const socialIconStyle = {
  display: 'grid',
  placeItems: 'center',
  width: 38,
  height: 38,
  borderRadius: 999,
  background: 'rgba(255,255,255,.1)',
  color: '#fff',
} as const

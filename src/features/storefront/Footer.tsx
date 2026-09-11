import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { getSiteSettings } from '../../lib/catalog'

const shopLinks = [
  { label: 'All products', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'New arrivals', to: '/shop?sort=newest' },
  { label: 'Offers', to: '/offers' },
]

export function Footer() {
  const settings = getSiteSettings()
  return (
    <footer style={{ background: 'var(--white)', marginTop: 'var(--sp-20)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-page" style={{ padding: 'var(--sp-12) var(--gutter)', display: 'grid', gap: 'var(--sp-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div>
          <div style={{ font: '800 24px/1 var(--font-display)', color: 'var(--ink-900)' }}>
            Ragh<span style={{ color: 'var(--orange-500)' }}>a</span>v
          </div>
          <div style={{ marginTop: 16, display: 'grid', gap: 8, font: 'var(--fw-medium) var(--fs-sm)/1.6 var(--font-body)', color: 'var(--text-body)' }}>
            <span>Address: {settings.area}</span>
            <span>Phone: +91 {settings.whatsappNumber.slice(2, 7)} {settings.whatsappNumber.slice(7)}</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <a href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" style={socialIconStyle}>
              <Icon name="instagram" size={16} />
            </a>
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" style={socialIconStyle}>
              <Icon name="message-circle" size={16} />
            </a>
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', marginBottom: 14 }}>Shop</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {shopLinks.map((it) => (
              <Link key={it.label} to={it.to} style={{ font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none' }}>
                {it.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', marginBottom: 14 }}>Visit us</div>
          <div style={{ display: 'grid', gap: 10, font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-body)' }}>
            <span>{settings.hours}</span>
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(settings.area)}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--ink-900)', textDecoration: 'underline' }}
            >
              Get direction
            </a>
          </div>
        </div>

        <div>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', marginBottom: 14 }}>Get in touch</div>
          <p style={{ font: 'var(--fw-medium) var(--fs-sm)/1.5 var(--font-body)', color: 'var(--text-body)', marginBottom: 12 }}>
            Message us on WhatsApp for stock, prices or an order.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 18px', borderRadius: 999, border: '1.5px solid var(--ink-900)', color: 'var(--ink-900)', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', textDecoration: 'none' }}
          >
            <Icon name="message-circle" size={16} />
            Message us
          </a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div
          className="container-page"
          style={{ padding: '16px var(--gutter)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}
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
  width: 34,
  height: 34,
  borderRadius: 999,
  border: '1px solid var(--border-default)',
  color: 'var(--ink-900)',
} as const

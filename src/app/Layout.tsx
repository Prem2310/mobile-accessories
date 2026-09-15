import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Icon } from '../components/ds/Icon'
import { WhatsAppCTA } from '../components/ds/WhatsAppCTA'
import { CartDrawer } from '../features/storefront/CartDrawer'
import { Footer } from '../features/storefront/Footer'
import { Header } from '../features/storefront/Header'
import { MobileBottomNav } from '../features/storefront/MobileBottomNav'
import { getSiteSettings } from '../lib/catalog'
import { buildGeneralEnquiryMessage, waLink } from '../lib/whatsapp'
import type { SiteSettings } from '../lib/types'

export function Layout() {
  const settings = getSiteSettings()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  // Product pages already carry their own WhatsApp CTA in the sticky mobile buy bar —
  // the global floating icon would sit on top of it, so it's suppressed there on mobile.
  const hasMobileBuyBar = location.pathname.startsWith('/products/')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingBottom: 'calc(64px + env(safe-area-inset-bottom))' }} className="md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      {!hasMobileBuyBar && (
        <div className="md:hidden fixed right-4 z-40" style={{ bottom: 'calc(76px + env(safe-area-inset-bottom))' }}>
          <IconOnlyWhatsApp settings={settings} />
        </div>
      )}
      <div className="hidden md:block fixed right-6 z-40" style={{ bottom: 'var(--sp-6)' }}>
        <WhatsAppCTA phone={settings.whatsappNumber} message={buildGeneralEnquiryMessage(settings)} style={{ boxShadow: 'var(--shadow-hover)' }} />
      </div>
    </div>
  )
}

function IconOnlyWhatsApp({ settings }: { settings: SiteSettings }) {
  return (
    <a
      href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        width: 52,
        height: 52,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--whatsapp)',
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        boxShadow: 'var(--shadow-hover)',
      }}
    >
      <Icon name="message-circle" size={24} color="#fff" />
    </a>
  )
}

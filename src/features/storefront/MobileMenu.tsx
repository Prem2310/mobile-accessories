import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import type { Category, SiteSettings } from '../../lib/types'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'

export interface MobileMenuProps {
  open: boolean
  onClose: () => void
  categories: Category[]
  settings: SiteSettings
}

const NAV_LINKS = [
  { to: '/shop?sort=newest', label: 'New Arrivals' },
  { to: '/shop?sort=bestselling', label: 'Best Sellers' },
  { to: '/offers', label: 'Offers' },
  { to: '/categories', label: 'All Categories' },
]

/** Slide-in left panel with an accordion "Shop" section — the standard mobile-nav pattern, built from scratch for this app (no code/assets copied from any reference site). */
export function MobileMenu({ open, onClose, categories, settings }: MobileMenuProps) {
  const [shopExpanded, setShopExpanded] = useState(true)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 60 }}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 'min(320px, 86vw)', background: 'var(--white)', zIndex: 61, display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-hover)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ font: '800 20px/1 var(--font-display)', color: 'var(--ink-900)' }}>
                Ragh<span style={{ color: 'var(--orange-500)' }}>a</span>v
              </div>
              <button onClick={onClose} aria-label="Close menu" style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
                <Icon name="x" size={22} color="var(--ink-900)" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--sp-4) var(--sp-5)' }}>
              <button
                onClick={() => setShopExpanded((v) => !v)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 0, background: 'none', cursor: 'pointer', padding: '10px 0', font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)', color: 'var(--ink-900)' }}
              >
                Shop by category
                <Icon name="chevron-down" size={16} style={{ transform: shopExpanded ? 'rotate(180deg)' : 'none', transition: 'var(--transition-control)' }} />
              </button>
              <AnimatePresence initial={false}>
                {shopExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gap: 2, paddingBottom: 8 }}>
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/shop?category=${c.slug}`}
                          onClick={onClose}
                          style={{ padding: '9px 8px', borderRadius: 'var(--radius-sm)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-body)', textDecoration: 'none' }}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ borderTop: '1px solid var(--border-subtle)', margin: 'var(--sp-2) 0' }} />

              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={onClose}
                  style={{ display: 'block', padding: '10px 0', font: 'var(--fw-bold) var(--fs-base)/1 var(--font-body)', color: 'var(--ink-900)', textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div style={{ padding: 'var(--sp-5)', borderTop: '1px solid var(--border-subtle)' }}>
              <a
                href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 999, background: 'var(--whatsapp)', color: '#fff', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', textDecoration: 'none' }}
              >
                <Icon name="message-circle" size={18} />
                Message on WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { getHeroBanners, getSiteSettings } from '../../lib/catalog'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'

const heroStagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.3, 1] as const } },
}

/**
 * Light, photography-led hero: a full-bleed banner carousel when the admin has uploaded images,
 * falling back to a plain text hero (no placeholder 3D/illustration) when none exist yet.
 */
export function HeroCarousel() {
  const settings = getSiteSettings()
  const banners = getHeroBanners()

  if (banners.length === 0) return <TextHero settings={settings} />

  return <ImageCarousel banners={banners} settings={settings} />
}

function ImageCarousel({ banners, settings }: { banners: ReturnType<typeof getHeroBanners>; settings: ReturnType<typeof getSiteSettings> }) {
  const [index, setIndex] = useState(0)
  const banner = banners[index]
  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + banners.length) % banners.length)

  return (
    <section style={{ position: 'relative', background: 'var(--surface-page)' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', maxHeight: 560, overflow: 'hidden' }} className="md:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <picture>
              {banner.imageMobile && <source media="(max-width: 767px)" srcSet={banner.imageMobile} />}
              <img
                src={banner.imageDesktop || banner.imageMobile}
                alt={banner.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </picture>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(6,23,56,.55), transparent 45%)' }} />
            <div className="container-page" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--sp-8) var(--gutter) var(--sp-8)' }}>
              <h1 style={{ font: '800 clamp(24px, 3.4vw, 38px)/1.15 var(--font-display)', color: '#fff', maxWidth: 520 }}>{banner.title}</h1>
              {banner.description && <p style={{ marginTop: 'var(--sp-2)', font: 'var(--fw-medium) var(--fs-md)/1.4 var(--font-body)', color: 'var(--navy-100)', maxWidth: 460 }}>{banner.description}</p>}
              {banner.ctaLabel && banner.ctaHref && (
                <Link to={banner.ctaHref} style={{ display: 'inline-block', marginTop: 'var(--sp-4)' }}>
                  <Button>{banner.ctaLabel}</Button>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous banner" style={arrowStyle('left')}>
              <Icon name="chevron-left" size={20} color="var(--navy-800)" />
            </button>
            <button onClick={() => go(1)} aria-label="Next banner" style={arrowStyle('right')}>
              <Icon name="chevron-right" size={20} color="var(--navy-800)" />
            </button>
            <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {banners.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show banner ${i + 1}`}
                  style={{ width: i === index ? 20 : 6, height: 6, borderRadius: 999, border: 0, cursor: 'pointer', background: i === index ? 'var(--orange-500)' : 'rgba(255,255,255,.6)', transition: 'var(--transition-control)' }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <TrustStrip settings={settings} />
    </section>
  )
}

function TextHero({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const reduce = useReducedMotion()
  return (
    <section style={{ background: 'var(--surface-page)' }}>
      <motion.div
        className="container-page"
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : 'show'}
        variants={reduce ? undefined : heroStagger}
        style={{ padding: 'var(--sp-16) var(--gutter) var(--sp-14)', display: 'grid', justifyItems: 'start', gap: 'var(--sp-5)', textAlign: 'left', maxWidth: 640 }}
      >
        <motion.div variants={reduce ? undefined : heroItem} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', padding: '6px 14px 6px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--orange-50)', border: '1px solid var(--orange-100)' }}>
          <Icon name="map-pin" size={14} color="var(--orange-600)" />
          <span style={{ font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)', color: 'var(--orange-700)' }}>
            {settings.area} · {settings.hours}
          </span>
        </motion.div>

        <motion.h1 variants={reduce ? undefined : heroItem} style={{ font: '800 clamp(32px, 4.4vw, 52px)/1.08 var(--font-display)', color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>
          {settings.heroHeadline || 'Cases, chargers and earbuds — fitted while you wait.'}
        </motion.h1>

        <motion.p variants={reduce ? undefined : heroItem} style={{ font: 'var(--fw-medium) var(--fs-lg)/1.55 var(--font-body)', color: 'var(--text-muted)' }}>
          {settings.heroSubheadline || "The same stock we keep at the counter — order here, or message us on WhatsApp and we'll have it ready."}
        </motion.p>

        <motion.div variants={reduce ? undefined : heroItem} style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', paddingTop: 'var(--sp-2)' }}>
          <Link to="/shop">
            <Button size="lg">Shop now</Button>
          </Link>
          <Button
            as="a"
            size="lg"
            variant="whatsapp"
            href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
            target="_blank"
            rel="noreferrer"
            iconLeft={<Icon name="message-circle" size={18} />}
          >
            Message on WhatsApp
          </Button>
        </motion.div>
      </motion.div>

      <TrustStrip settings={settings} />
    </section>
  )
}

function TrustStrip({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const points = [
    { icon: 'truck' as const, title: 'Free local delivery', body: `Free delivery over ₹${settings.freeDeliveryThreshold}` },
    { icon: 'message-circle' as const, title: 'Order on WhatsApp', body: 'Message us, pay on pickup or delivery' },
    { icon: 'zap' as const, title: 'Fitted free', body: 'Screen guards fitted at the counter' },
    { icon: 'shield-check' as const, title: 'Checked before it ships', body: 'Test-fit on the actual handset' },
  ]
  return (
    <div className="container-page" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'var(--sp-5)', padding: 'var(--sp-5) 0' }}>
        {points.map((p) => (
          <div key={p.title} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
            <Icon name={p.icon} size={20} color="var(--orange-500)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)' }}>{p.title}</div>
              <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)', color: 'var(--text-muted)' }}>{p.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 14,
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 0,
    cursor: 'pointer',
    background: 'rgba(255,255,255,.92)',
    boxShadow: 'var(--shadow-card)',
    display: 'grid',
    placeItems: 'center',
  }
}

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { OfferBanner } from '../../components/ds/OfferBanner'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getActiveOffers, getBestsellers, getCategories, getFeaturedProducts, getNewArrivals, getProducts, getSiteSettings } from '../../lib/catalog'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'
import { HeroCarousel } from './HeroCarousel'
import { HotDeals, TestimonialSection } from './HotDeals'
import { ProductGrid } from './ProductGrid'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.3, 1] as const } },
}

function Reveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

export function HomePage() {
  const settings = getSiteSettings()
  const categories = getCategories()
  const featured = getFeaturedProducts()
  const bestsellers = getBestsellers()
  const newArrivals = getNewArrivals()
  const offers = getActiveOffers()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-20)', paddingBottom: 'var(--sp-16)' }}>
      <HeroCarousel />

      <Reveal>
        <HotDeals />
      </Reveal>

      <section className="container-page">
        <Reveal>
          <SectionHeading title="Shop by category" align="center" />
        </Reveal>
        <div style={{ display: 'flex', gap: 'var(--sp-6)', overflowX: 'auto', paddingBottom: 'var(--sp-2)', justifyContent: 'center' }}>
          {categories.slice(0, 8).map((c, i) => (
            <motion.div key={c.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.04 }} style={{ flex: '0 0 auto' }}>
              <Link
                to={`/shop?category=${c.slug}`}
                style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-3)', width: 96, textAlign: 'center', textDecoration: 'none' }}
              >
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--ink-900)', display: 'grid', placeItems: 'center', transition: 'var(--transition-control)' }}>
                  <Icon name={c.icon ?? 'package'} size={26} color="#fff" />
                </div>
                <div style={{ font: 'var(--fw-semibold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)' }}>{c.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading title="Trending now" action={<Link to="/shop?sort=featured" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={featured} />
        </Reveal>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading title="Best sellers" action={<Link to="/shop?sort=bestselling" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={bestsellers} />
        </Reveal>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading title="Latest arrivals" action={<Link to="/shop?sort=newest" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={newArrivals} />
        </Reveal>
      </section>

      {offers.length > 0 && (
        <section className="container-page" style={{ display: 'grid', gap: 'var(--sp-4)' }}>
          <Reveal>
            <SectionHeading title="Limited-time offers" />
          </Reveal>
          {offers.map((o) => (
            <Reveal key={o.id}>
              <OfferBanner title={o.title} subtitle={o.subtitle} tone={o.tone} cta={o.ctaHref ? <Link to={o.ctaHref}><Button variant={o.tone === 'navy' ? 'primary' : 'secondary'}>{o.ctaLabel}</Button></Link> : undefined} />
            </Reveal>
          ))}
        </section>
      )}

      <Reveal>
        <TestimonialSection />
      </Reveal>

      <InstagramSection settings={settings} />

      <section className="container-page">
        <Reveal>
          <div style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12) var(--sp-8)', display: 'grid', gap: 'var(--sp-4)', justifyItems: 'center', textAlign: 'center' }}>
            <div style={{ font: 'var(--type-h2)', color: '#fff' }}>Prefer to just chat?</div>
            <p style={{ color: 'var(--gray-300)', maxWidth: 440 }}>Tell us your phone model on WhatsApp — we'll send prices and photos right away.</p>
            <Button
              as="a"
              variant="whatsapp"
              size="lg"
              href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
              target="_blank"
              rel="noreferrer"
              iconLeft={<Icon name="message-circle" size={20} />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function InstagramSection({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const photos = getProducts()
    .flatMap((p) => p.images)
    .slice(0, 5)
  const slots: (string | null)[] = [...photos, ...Array.from({ length: Math.max(0, 5 - photos.length) }).map(() => null)]

  return (
    <section className="container-page">
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 'var(--sp-6)' }}>
          <h2 style={{ font: '800 clamp(22px, 2.6vw, 30px)/1.15 var(--font-display)' }}>Shop Gram</h2>
          <a href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 6, font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-muted)', textDecoration: 'none' }}>
            Follow {settings.instagramHandle} for what's new in store
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2 }}>
          {slots.map((src, i) =>
            src ? (
              <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ) : (
              <div key={i} style={{ aspectRatio: '1/1', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', border: '1px dashed var(--border-default)' }}>
                <Icon name="instagram" size={20} color="var(--gray-400)" />
              </div>
            )
          )}
        </div>
      </Reveal>
    </section>
  )
}

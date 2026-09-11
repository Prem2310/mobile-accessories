import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { OfferBanner } from '../../components/ds/OfferBanner'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getActiveOffers, getBestsellers, getCategories, getFeaturedProducts, getNewArrivals, getSiteSettings } from '../../lib/catalog'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'
import { HeroCarousel } from './HeroCarousel'
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

      <section className="container-page">
        <Reveal>
          <SectionHeading title="Shop by category" action={<Link to="/categories" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
        </Reveal>
        <div style={{ display: 'flex', gap: 'var(--sp-6)', overflowX: 'auto', paddingBottom: 'var(--sp-2)' }}>
          {categories.slice(0, 8).map((c, i) => (
            <motion.div key={c.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.04 }} style={{ flex: '0 0 auto' }}>
              <Link
                to={`/shop?category=${c.slug}`}
                style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-3)', width: 96, textAlign: 'center', textDecoration: 'none' }}
              >
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center', transition: 'var(--transition-control)' }}>
                  <Icon name={c.icon ?? 'package'} size={26} color="var(--navy-900)" />
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

      <InstagramSection settings={settings} />

      <section className="container-page">
        <Reveal>
          <div style={{ background: 'var(--surface-dark)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12) var(--sp-8)', display: 'grid', gap: 'var(--sp-4)', justifyItems: 'center', textAlign: 'center' }}>
            <div style={{ font: 'var(--type-h2)', color: '#fff' }}>Prefer to just chat?</div>
            <p style={{ color: 'var(--navy-200)', maxWidth: 440 }}>Tell us your phone model on WhatsApp — we'll send prices and photos right away.</p>
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
  return (
    <section className="container-page">
      <Reveal>
        <SectionHeading
          title="Follow Raghav on Instagram"
          action={
            <a href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>
              {settings.instagramHandle}
            </a>
          }
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--sp-3)' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: '1/1', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', border: '1px dashed var(--navy-200)' }}>
              <Icon name="instagram" size={20} color="var(--gray-400)" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

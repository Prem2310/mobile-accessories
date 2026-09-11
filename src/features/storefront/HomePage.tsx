import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { OfferBanner } from '../../components/ds/OfferBanner'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getActiveOffers, getBestsellers, getCategories, getFeaturedProducts, getNewArrivals, getSiteSettings } from '../../lib/catalog'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'
import { HeroScene } from '../3d/HeroScene'
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
      <Hero settings={settings} />

      <section className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Browse" title="Shop by category" action={<Link to="/categories" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--sp-4)' }}>
          {categories.slice(0, 8).map((c, i) => (
            <motion.div key={c.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.04 }}>
              <Link
                to={`/shop?category=${c.slug}`}
                style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-2)', padding: 'var(--sp-5) var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', textAlign: 'center', textDecoration: 'none' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-pill)', background: 'var(--orange-50)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={c.icon ?? 'package'} size={22} color="var(--orange-500)" />
                </div>
                <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)' }}>{c.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Trending" title="Trending now" action={<Link to="/shop?sort=featured" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={featured} />
        </Reveal>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Popular" title="Best sellers" action={<Link to="/shop?sort=bestselling" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={bestsellers} />
        </Reveal>
      </section>

      <section className="container-page">
        <Reveal>
          <SectionHeading eyebrow="Just in" title="Latest arrivals" action={<Link to="/shop?sort=newest" style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-link)' }}>View all</Link>} />
          <ProductGrid products={newArrivals} />
        </Reveal>
      </section>

      {offers.length > 0 && (
        <section className="container-page" style={{ display: 'grid', gap: 'var(--sp-4)' }}>
          <Reveal>
            <SectionHeading eyebrow="Don't miss out" title="Limited-time offers" />
          </Reveal>
          {offers.map((o) => (
            <Reveal key={o.id}>
              <OfferBanner title={o.title} subtitle={o.subtitle} tone={o.tone} cta={o.ctaHref ? <Link to={o.ctaHref}><Button variant={o.tone === 'navy' ? 'primary' : 'secondary'}>{o.ctaLabel}</Button></Link> : undefined} />
            </Reveal>
          ))}
        </section>
      )}

      <WhyRaghav />
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

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.3, 1] as const } },
}

function Hero({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const reduce = useReducedMotion()
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(160deg, var(--navy-900), var(--navy-800) 55%, var(--navy-900))', overflow: 'hidden' }}>
      {/* one still glow, seated behind where the product cluster sits — not drifting blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '4%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,106,0,.22), transparent 68%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none', background: 'radial-gradient(ellipse at 20% 100%, rgba(43,79,160,.25), transparent 55%)' }}
      />

      <motion.div
        className="container-page"
        initial={reduce ? undefined : 'hidden'}
        animate={reduce ? undefined : 'show'}
        variants={reduce ? undefined : heroStagger}
        style={{ position: 'relative', padding: 'var(--sp-16) var(--gutter) var(--sp-20)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--sp-10)', alignItems: 'center' }}
      >
        <div style={{ display: 'grid', gap: 'var(--sp-5)' }}>
          <motion.div variants={reduce ? undefined : heroItem} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)', width: 'fit-content', padding: '6px 14px 6px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)' }}>
            <Icon name="map-pin" size={14} color="var(--orange-400)" />
            <span style={{ font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)', color: 'var(--navy-100)' }}>
              {settings.area} · {settings.hours}
            </span>
          </motion.div>

          <motion.h1 variants={reduce ? undefined : heroItem} style={{ font: '800 clamp(36px, 4.6vw, 58px)/1.06 var(--font-display)', color: '#fff', letterSpacing: '-0.02em', maxWidth: 560 }}>
            {settings.heroHeadline || 'Cases, chargers and earbuds — fitted while you wait.'}
          </motion.h1>

          <motion.p variants={reduce ? undefined : heroItem} style={{ font: 'var(--fw-medium) var(--fs-lg)/1.55 var(--font-body)', color: 'var(--navy-200)', maxWidth: 440 }}>
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
        </div>

        <motion.div variants={reduce ? undefined : heroItem}>
          <HeroScene />
        </motion.div>
      </motion.div>
    </section>
  )
}

function WhyRaghav() {
  const points = [
    { icon: 'shield-check' as const, title: 'Checked on the actual handset', body: 'Every case and glass is test-fit before it goes on the shelf.' },
    { icon: 'zap' as const, title: 'Fitted free, every day', body: 'Screen guards fitted at the counter while you wait.' },
    { icon: 'truck' as const, title: 'Fast local delivery', body: 'Free delivery in Vastral, quick dispatch across Ahmedabad.' },
  ]
  return (
    <section className="container-page">
      <Reveal>
        <SectionHeading eyebrow="Why Raghav" title="Why shop with us" />
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-5)' }}>
        {points.map((p, i) => (
          <motion.div key={p.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }} style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-6)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-pill)', background: 'var(--orange-50)', display: 'grid', placeItems: 'center', marginBottom: 'var(--sp-3)' }}>
              <Icon name={p.icon} size={20} color="var(--orange-500)" />
            </div>
            <div style={{ font: 'var(--fw-bold) var(--fs-lg)/1.3 var(--font-body)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>{p.title}</div>
            <p style={{ color: 'var(--text-muted)' }}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function InstagramSection({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  return (
    <section className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Social proof"
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

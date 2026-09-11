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

function Hero({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const reduce = useReducedMotion()
  return (
    <section style={{ position: 'relative', background: 'linear-gradient(135deg, var(--navy-900), var(--navy-800) 60%, var(--navy-700))', overflow: 'hidden' }}>
      {!reduce && <AnimatedGradientBlobs />}
      <div className="container-page" style={{ position: 'relative', padding: 'var(--sp-16) var(--gutter) var(--sp-20)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--sp-10)', alignItems: 'center' }}>
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.3, 1] }}
          style={{ display: 'grid', gap: 'var(--sp-5)' }}
        >
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--orange-400)' }}>
            {settings.heroEyebrow || settings.area}
          </span>
          <h1 style={{ font: '800 clamp(34px, 5vw, 56px)/1.05 var(--font-display)', color: '#fff', letterSpacing: '-0.02em' }}>
            {settings.heroHeadline || 'Upgrade your phone. Upgrade your style.'}
          </h1>
          <p style={{ font: 'var(--fw-medium) var(--fs-lg)/1.5 var(--font-body)', color: 'var(--navy-200)', maxWidth: 440 }}>
            {settings.heroSubheadline || 'Premium cases, chargers and everyday tech essentials — priced honestly, fitted free at our Vastral counter.'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <Button size="lg">Shop now</Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>
                Browse categories
              </Button>
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
              WhatsApp us
            </Button>
          </div>
        </motion.div>

        <HeroScene />
      </div>
    </section>
  )
}

function AnimatedGradientBlobs() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-10%', right: '-5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,106,0,.28), transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '-15%', left: '10%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,79,160,.35), transparent 70%)' }}
      />
    </div>
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

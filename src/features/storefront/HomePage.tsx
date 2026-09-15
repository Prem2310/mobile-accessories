import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../../components/ds/Icon'
import { formatINR } from '../../lib/format'
import { getApprovedReviews, getBestsellers, getCategories, getCategoryProductCount, getNewArrivals, getProducts, getSiteSettings } from '../../lib/catalog'
import type { Product } from '../../lib/types'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'
import { useCartStore } from '../../store/cart'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} transition={{ delay }} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

function SectionH2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        margin: 0,
        color: '#000',
        fontFamily: "'Archivo Black', Archivo, sans-serif",
        fontSize: 'clamp(26px,3.4vw,40px)',
        letterSpacing: '-0.03em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </h2>
  )
}

const CATEGORY_ICON_BY_SLUG: Record<string, IconName> = {
  cases: 'smartphone',
  glass: 'shield-check',
  charging: 'zap',
  audio: 'headphones',
  power: 'battery-charging',
}

export function HomePage() {
  const settings = getSiteSettings()
  const categories = getCategories()
  const bestsellers = getBestsellers(4)
  const newArrivals = getNewArrivals(4)
  const reviews = getApprovedReviews().slice(0, 3)
  const productCount = getProducts().length

  return (
    <div style={{ fontFamily: 'Archivo, sans-serif', color: '#000', background: '#fff', overflowX: 'hidden' }}>
      <Hero settings={settings} productCount={productCount} />
      <Marquee />

      <section id="shop" style={{ borderBottom: '1px solid #000' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', padding: '48px 28px 24px' }}>
          <Reveal>
            <SectionH2>Shop by category</SectionH2>
          </Reveal>
          <Link to="/categories" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', borderBottom: '2px solid #000', textDecoration: 'none' }}>
            All {categories.length} categories
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', borderTop: '1px solid #000' }}>
          {categories.slice(0, 8).map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.05}>
              <Link
                to={`/shop?category=${c.slug}`}
                className="lp-cat-card"
                style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '28px 22px', borderRight: '1px solid #000', textDecoration: 'none' }}
              >
                <Icon name={c.icon ?? CATEGORY_ICON_BY_SLUG[c.slug] ?? 'package'} size={40} strokeWidth={1.4} />
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>{c.name}</span>
                  <span style={{ fontSize: 12, opacity: 0.6 }}>{getCategoryProductCount(c.id)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ProductSection id="deals" title="Best sellers" meta="Updated weekly" products={bestsellers} tag="Best seller" tagSolid viewAllHref="/shop?sort=bestselling" />
      <ProductSection id="arrivals" title="New arrivals" meta="In store this week" products={newArrivals} tag="Just in" viewAllHref="/shop?sort=newest" />

      {reviews.length > 0 && (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', borderBottom: '1px solid #000' }}>
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <figure style={{ margin: 0, padding: '36px 28px', borderRight: '1px solid #000', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
                <div style={{ fontSize: 14, letterSpacing: '0.3em' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.45, fontWeight: 600, letterSpacing: '-0.01em' }}>&ldquo;{r.comment}&rdquo;</blockquote>
                <figcaption style={{ marginTop: 'auto', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>{r.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </section>
      )}

      <ContactBand settings={settings} />
    </div>
  )
}

function Hero({ settings, productCount }: { settings: ReturnType<typeof getSiteSettings>; productCount: number }) {
  const stats = [
    { value: '9+', label: 'Years in Vastral' },
    { value: `${productCount}+`, label: 'Products stocked' },
    { value: '4.8', label: 'Google rating' },
    { value: '7 days', label: 'No-fuss replacement' },
  ]
  return (
    <section style={{ borderBottom: '1px solid #000', padding: '0 28px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid #e2e2e2',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#666',
        }}
      >
        <span>Estd. 2017 · {settings.area || 'Vastral, Ahmedabad'}</span>
        <span>Free fitting · Same-day pickup</span>
      </div>

      <div style={{ padding: '56px 0 24px' }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            margin: 0,
            color: '#000',
            fontFamily: "'Archivo Black', Archivo, sans-serif",
            fontSize: 'clamp(30px,10.6vw,178px)',
            lineHeight: 0.84,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
          }}
        >
          Mobile<br />Accessories
        </motion.h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28, alignItems: 'end', paddingBottom: 44 }}>
        <p style={{ margin: 0, maxWidth: '46ch', fontSize: 17, lineHeight: 1.55, color: '#444' }}>
          Cases, tempered glass, fast chargers, earbuds and power banks — hand-picked, tested on the counter, and priced like a neighbourhood shop should.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end' }}>
          <Link to="/shop" className="lp-btn-solid" style={{ background: '#000', color: '#fff', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            Shop all
          </Link>
          <a
            href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
            target="_blank"
            rel="noopener"
            className="lp-btn-outline"
            style={{ border: '1px solid #000', color: '#000', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', borderTop: '1px solid #000' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ padding: i === 0 ? '22px 22px 26px 0' : 22, borderLeft: i === 0 ? undefined : '1px solid #e2e2e2' }}>
            <div style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 32, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const MARQUEE_ITEMS = ['Free screen-guard fitting', 'Same-day pickup', '6-month warranty', 'UPI accepted']

function Marquee() {
  const track = (key: string) => (
    <div key={key} style={{ display: 'flex', gap: 44, padding: '14px 22px', fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {Array.from({ length: 2 }).flatMap((_, rep) =>
        MARQUEE_ITEMS.flatMap((item, i) => [
          <span key={`${rep}-${i}`}>{item}</span>,
          <span key={`${rep}-${i}-dot`}>·</span>,
        ]),
      )}
    </div>
  )
  return (
    <div style={{ overflow: 'hidden', borderBottom: '1px solid #000', background: '#000', color: '#fff' }}>
      <div className="lp-marquee-track">
        {track('a')}
        {track('b')}
      </div>
    </div>
  )
}

function ProductSection({
  id,
  title,
  meta,
  products,
  tag,
  tagSolid = false,
  viewAllHref,
}: {
  id: string
  title: string
  meta: string
  products: Product[]
  tag: string
  tagSolid?: boolean
  viewAllHref: string
}) {
  const addItem = useCartStore((s) => s.addItem)
  if (products.length === 0) return null

  return (
    <section id={id} style={{ borderBottom: '1px solid #000' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', padding: '48px 28px 24px' }}>
        <Reveal>
          <SectionH2>{title}</SectionH2>
        </Reveal>
        <Link to={viewAllHref} style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', textDecoration: 'none' }}>
          {meta}
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', borderTop: '1px solid #000' }}>
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.05}>
            <article className="lp-product-card" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 22, borderRight: '1px solid #000', height: '100%' }}>
              <Link to={`/products/${p.slug}`} style={{ position: 'relative', height: 230, background: '#f2f2f2', borderRadius: 12, overflow: 'hidden', display: 'block' }}>
                {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    pointerEvents: 'none',
                    background: tagSolid ? '#000' : '#fff',
                    border: tagSolid ? 'none' : '1px solid #000',
                    color: tagSolid ? '#fff' : '#000',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '6px 10px',
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.brand && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#777' }}>{p.brand}</span>}
                <h3 style={{ margin: 0, color: '#000', fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{p.title}</h3>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 20 }}>{formatINR(p.price)}</span>
                  {p.mrp && p.mrp > p.price && <span style={{ fontSize: 13, color: '#888', textDecoration: 'line-through' }}>{formatINR(p.mrp)}</span>}
                </div>
                <button
                  type="button"
                  disabled={p.stock <= 0}
                  onClick={() => addItem({ productId: p.id, title: p.title, price: p.price, slug: p.slug, quantity: 1, image: p.images[0] })}
                  className="lp-add-btn"
                  style={{
                    border: '1px solid #000',
                    background: '#fff',
                    color: '#000',
                    fontFamily: 'Archivo, sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '10px 14px',
                    borderRadius: 999,
                    cursor: p.stock <= 0 ? 'not-allowed' : 'pointer',
                    opacity: p.stock <= 0 ? 0.4 : 1,
                  }}
                >
                  {p.stock <= 0 ? 'Sold out' : 'Add'}
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ContactBand({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const photos = getProducts()
    .flatMap((p) => p.images)
    .slice(0, 6)
  const tiles: (string | null)[] = [...photos, ...Array.from({ length: Math.max(0, 6 - photos.length) }).map(() => null)]

  return (
    <section id="visit" style={{ background: '#000', color: '#fff', borderBottom: '1px solid #000' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, padding: '44px 28px 30px' }}>
        <Reveal>
          <h2 style={{ margin: 0, color: '#fff', fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 'clamp(28px,4.4vw,54px)', letterSpacing: '-0.035em', textTransform: 'uppercase' }}>Two taps to us</h2>
        </Reveal>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8d8d8d' }}>{settings.area || 'Vastral, Ahmedabad'} · Open all days</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '40px 28px', borderRight: '1px solid rgba(255,255,255,0.18)', height: '100%' }}>
            <Icon name="message-circle" size={46} strokeWidth={1.3} color="#fff" />
            <h3 style={{ margin: 0, color: '#fff', fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 'clamp(24px,3vw,36px)', lineHeight: 1, textTransform: 'uppercase' }}>
              Order on<br />WhatsApp
            </h3>
            <p style={{ margin: 0, maxWidth: '34ch', fontSize: 16, lineHeight: 1.6, color: '#b4b4b4' }}>
              Send the model of your phone. We check stock, send a photo and price, and keep it aside at the counter.
            </p>
            <a
              href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
              target="_blank"
              rel="noopener"
              className="lp-btn-on-black"
              style={{ alignSelf: 'flex-start', background: '#fff', color: '#000', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              Message the shop
            </a>
            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 1, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ background: '#000', padding: '14px 16px' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8d8d8d' }}>Call</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{settings.whatsappNumber ? `+91 ${settings.whatsappNumber.slice(-10, -5)} ${settings.whatsappNumber.slice(-5)}` : '—'}</div>
              </div>
              <div style={{ background: '#000', padding: '14px 16px' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8d8d8d' }}>Hours</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{settings.hours || '—'}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 28px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 'none', width: 54, height: 54, borderRadius: '50%', padding: 2, background: 'linear-gradient(140deg,#fff,#8a8a8a 55%,#2a2a2a)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 18 }}>R</div>
              </div>
              <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', overflowWrap: 'anywhere' }}>{settings.instagramHandle || '@raghav_mobile_accessories'}</span>
                <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8d8d' }}>New stock · fitting reels · offers</span>
              </div>
              <Icon name="instagram" size={24} color="#fff" style={{ marginLeft: 'auto' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {tiles.map((src, i) =>
                src ? (
                  <div key={i} className="lp-ig-tile" style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ) : (
                  <div key={i} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#1a1a1a', display: 'grid', placeItems: 'center' }}>
                    <Icon name="instagram" size={18} color="#4d4d4d" />
                  </div>
                ),
              )}
            </div>

            <a
              href={settings.instagramHandle ? `https://www.instagram.com/${settings.instagramHandle.replace('@', '')}/` : 'https://www.instagram.com/'}
              target="_blank"
              rel="noopener"
              className="lp-btn-outline-on-black"
              style={{ alignSelf: 'flex-start', border: '1px solid #fff', color: '#fff', padding: '15px 26px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

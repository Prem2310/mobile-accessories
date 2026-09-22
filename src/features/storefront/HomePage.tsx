import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../../components/ds/Icon'
import { formatINR } from '../../lib/format'
import { getApprovedReviews, getBestsellers, getCategories, getCategoryProductCount, getNewArrivals, getProducts, getSiteSettings } from '../../lib/catalog'
import type { Category, Product } from '../../lib/types'
import { buildGeneralEnquiryMessage, waLink } from '../../lib/whatsapp'
import { useCartStore } from '../../store/cart'

const MotionLink = motion(Link)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } },
}

// Parent/child pair for scroll-triggered stagger reveals — orchestrates timing
// via staggerChildren instead of computing a per-item delay by hand.
const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.03 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } },
}

const springHover = { type: 'spring' as const, stiffness: 300, damping: 22 }
const tapScale = { scale: 0.96, transition: { duration: 0.15 } }

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} transition={{ delay }} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

// Wraps a grid so its motion children reveal in a stagger instead of all at once.
function RevealGrid({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className} style={style}>{children}</div>
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={staggerGrid} className={className} style={style}>
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

function CategoryTile({ category: c, reduce }: { category: Category; reduce: boolean | null }) {
  return (
    <MotionLink
      to={`/shop?category=${c.slug}`}
      variants={staggerItem}
      whileHover={reduce ? undefined : { backgroundColor: '#000', color: '#fff', rotateY: -7, y: -6, z: 24, transition: springHover }}
      whileTap={reduce ? undefined : tapScale}
      style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '28px 22px', borderRight: '1px solid #000', textDecoration: 'none', color: '#000', transformPerspective: 900 }}
    >
      <Icon name={c.icon ?? CATEGORY_ICON_BY_SLUG[c.slug] ?? 'package'} size={40} strokeWidth={1.4} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em' }}>{c.name}</span>
        <span style={{ fontSize: 12, opacity: 0.6 }}>{getCategoryProductCount(c.id)}</span>
      </div>
    </MotionLink>
  )
}

export function HomePage() {
  const settings = getSiteSettings()
  const categories = getCategories()
  const bestsellers = getBestsellers(4)
  const newArrivals = getNewArrivals(4)
  const reviews = getApprovedReviews().slice(0, 3)
  const productCount = getProducts().length
  const reduce = useReducedMotion()

  return (
    <div style={{ fontFamily: 'Archivo, sans-serif', color: '#000', background: '#fff' }}>
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
        <RevealGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', borderTop: '1px solid #000' }}>
          {categories.slice(0, 4).map((c) => (
            <CategoryTile key={c.id} category={c} reduce={reduce} />
          ))}
          {categories.length > 4 && (
            <div className="hidden sm:contents">
              {categories.slice(4, 8).map((c) => (
                <CategoryTile key={c.id} category={c} reduce={reduce} />
              ))}
            </div>
          )}
        </RevealGrid>
      </section>

      <ProductSection id="deals" title="Best sellers" meta="Updated weekly" products={bestsellers} tag="Best seller" tagSolid viewAllHref="/shop?sort=bestselling" />
      <ProductSection id="arrivals" title="New arrivals" meta="In store this week" products={newArrivals} tag="Just in" viewAllHref="/shop?sort=newest" />

      {reviews.length > 0 && (
        <RevealGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', borderBottom: '1px solid #000' }}>
          {reviews.map((r) => (
            <motion.figure
              key={r.id}
              variants={staggerItem}
              style={{ margin: 0, padding: '36px 28px', borderRight: '1px solid #000', display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}
            >
              <div style={{ fontSize: 14, letterSpacing: '0.3em' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              <blockquote style={{ margin: 0, fontSize: 18, lineHeight: 1.45, fontWeight: 600, letterSpacing: '-0.01em' }}>&ldquo;{r.comment}&rdquo;</blockquote>
              <figcaption style={{ marginTop: 'auto', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>{r.author}</figcaption>
            </motion.figure>
          ))}
        </RevealGrid>
      )}

      <ContactBand settings={settings} />
    </div>
  )
}

function Hero({ settings, productCount }: { settings: ReturnType<typeof getSiteSettings>; productCount: number }) {
  const stats = [
    { value: '5+', label: 'Years in Thaltej' },
    { value: `${productCount}+`, label: 'Products stocked' },
    { value: '5.0', label: 'Customer rating' },
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
        <span>Apple accessories specialist · {settings.area || 'Thaltej, Ahmedabad'}</span>
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
          Apple<br />Accessories
        </motion.h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 28, alignItems: 'end', paddingBottom: 44 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ margin: 0, maxWidth: '46ch', fontSize: 17, lineHeight: 1.55, color: '#444' }}
        >
          Cases, tempered glass, fast chargers, AirPods and cables — genuine picks, tested on the counter, and priced like a neighbourhood Apple store should.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end' }}
        >
          <MotionLink
            to="/shop"
            className="lp-btn-solid"
            whileTap={tapScale}
            style={{ background: '#000', color: '#fff', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Shop all
          </MotionLink>
          <motion.a
            href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
            target="_blank"
            rel="noopener"
            className="lp-btn-outline"
            whileTap={tapScale}
            style={{ border: '1px solid #000', color: '#000', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Order on WhatsApp
          </motion.a>
        </motion.div>
      </div>

      <RevealGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', borderTop: '1px solid #000' }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={staggerItem} style={{ padding: i === 0 ? '22px 22px 26px 0' : 22, borderLeft: i === 0 ? undefined : '1px solid #e2e2e2' }}>
            <div style={{ fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 32, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666' }}>{s.label}</div>
          </motion.div>
        ))}
      </RevealGrid>
    </section>
  )
}

const MARQUEE_ITEMS = ['Free screen-guard fitting', 'Same-day pickup', '6-month warranty', 'UPI accepted']

function Marquee() {
  const reduce = useReducedMotion()
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
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={reduce ? undefined : { duration: 26, ease: 'linear', repeat: Infinity }}
      >
        {track('a')}
        {track('b')}
      </motion.div>
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
  const reduce = useReducedMotion()
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
      <RevealGrid
        className="grid grid-cols-2 sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]"
        style={{ borderTop: '1px solid #000' }}
      >
        {products.map((p) => (
          <motion.article
            key={p.id}
            variants={staggerItem}
            whileHover={reduce ? undefined : { rotateX: 4, rotateY: -6, y: -8, z: 32, boxShadow: '0 34px 70px rgba(0,0,0,0.22)', transition: springHover }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 22, borderRight: '1px solid #000', height: '100%', transformPerspective: 1000 }}
          >
            <Link to={`/products/${p.slug}`} style={{ position: 'relative', aspectRatio: '1 / 1', background: '#f2f2f2', borderRadius: 12, overflow: 'hidden', display: 'block' }}>
              {p.images[0] && (
                <motion.img
                  src={p.images[0]}
                  alt=""
                  loading="lazy"
                  whileHover={reduce ? undefined : { scale: 1.08 }}
                  transition={springHover}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
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
              <motion.button
                type="button"
                disabled={p.stock <= 0}
                onClick={() => addItem({ productId: p.id, title: p.title, price: p.price, slug: p.slug, quantity: 1, image: p.images[0] })}
                className="lp-add-btn"
                whileTap={p.stock <= 0 ? undefined : tapScale}
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
              </motion.button>
            </div>
          </motion.article>
        ))}
      </RevealGrid>
    </section>
  )
}

const INSTAGRAM_PHOTOS = [
  '/images/instagram/post1.jpg',
  '/images/instagram/post2.jpg',
  '/images/instagram/post3.jpg',
  '/images/instagram/post4.jpg',
  '/images/instagram/post5.jpg',
  '/images/instagram/post6.jpg',
]

function ContactBand({ settings }: { settings: ReturnType<typeof getSiteSettings> }) {
  const tiles: (string | null)[] = INSTAGRAM_PHOTOS
  const reduce = useReducedMotion()

  return (
    <section id="visit" style={{ background: '#000', color: '#fff', borderBottom: '1px solid #000' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, padding: '44px 28px 30px' }}>
        <Reveal>
          <h2 style={{ margin: 0, color: '#fff', fontFamily: "'Archivo Black', Archivo, sans-serif", fontSize: 'clamp(28px,4.4vw,54px)', letterSpacing: '-0.035em', textTransform: 'uppercase' }}>Two taps to us</h2>
        </Reveal>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8d8d8d' }}>{settings.area || 'Thaltej, Ahmedabad'} · Open all days</span>
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
            <motion.a
              href={waLink(settings.whatsappNumber, buildGeneralEnquiryMessage(settings))}
              target="_blank"
              rel="noopener"
              className="lp-btn-on-black"
              whileTap={tapScale}
              style={{ alignSelf: 'flex-start', background: '#fff', color: '#000', padding: '16px 28px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              Message the shop
            </motion.a>
            <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.18)' }}>
              <div style={{ background: '#000', padding: '14px 16px' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8d8d8d' }}>Call</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{settings.whatsappNumber ? `+91 ${settings.whatsappNumber.slice(-10, -5)} ${settings.whatsappNumber.slice(-5)}` : '—'}</div>
              </div>
              <div style={{ background: '#000', padding: '14px 16px' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8d8d8d' }}>Hours</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{settings.hours || '—'}</div>
              </div>
              {settings.address && (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener"
                  style={{ gridColumn: '1 / -1', background: '#000', padding: '14px 16px', textDecoration: 'none' }}
                >
                  <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8d8d8d' }}>Address</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>{settings.address}</div>
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 28px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ flex: 'none', width: 54, height: 54, borderRadius: '50%', padding: 2, background: 'linear-gradient(140deg,#fff,#8a8a8a 55%,#2a2a2a)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <img src="/images/logo/logo-white.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              </div>
              <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', overflowWrap: 'anywhere' }}>{settings.instagramHandle || '@istuff.ahmedabad'}</span>
                <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8d8d8d' }}>New stock · fitting reels · offers</span>
              </div>
              <Icon name="instagram" size={24} color="#fff" style={{ marginLeft: 'auto' }} />
            </div>

            <RevealGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {tiles.map((src, i) =>
                src ? (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    whileHover={reduce ? undefined : { scale: 1.06, transition: springHover }}
                    style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}
                  >
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </motion.div>
                ) : (
                  <motion.div key={i} variants={staggerItem} style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#1a1a1a', display: 'grid', placeItems: 'center' }}>
                    <Icon name="instagram" size={18} color="#4d4d4d" />
                  </motion.div>
                ),
              )}
            </RevealGrid>

            <motion.a
              href={settings.instagramHandle ? `https://www.instagram.com/${settings.instagramHandle.replace('@', '')}/` : 'https://www.instagram.com/'}
              target="_blank"
              rel="noopener"
              className="lp-btn-outline-on-black"
              whileTap={tapScale}
              style={{ alignSelf: 'flex-start', border: '1px solid #fff', color: '#fff', padding: '15px 26px', borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none' }}
            >
              Follow on Instagram
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

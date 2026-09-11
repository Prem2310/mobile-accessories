import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ds/Icon'
import { getActiveOffers, getApprovedReviews, getProducts } from '../../lib/catalog'
import { ProductGrid } from './ProductGrid'

/** Countdown against a real admin-set `offers.ends_at` — renders nothing if no active offer has one, rather than fabricating a deadline. */
export function HotDeals() {
  const deal = getActiveOffers().find((o) => o.endsAt && new Date(o.endsAt).getTime() > Date.now())
  if (!deal) return null

  const products = getProducts({ discountedOnly: true, sort: 'discount' }).slice(0, 4)
  if (products.length === 0) return null

  return (
    <section className="container-page">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-3)', marginBottom: 'var(--sp-5)' }}>
        <div>
          <h2 style={{ font: '800 clamp(22px, 2.6vw, 30px)/1.15 var(--font-display)', color: 'var(--text-strong)' }}>{deal.title}</h2>
          {deal.subtitle && <p style={{ marginTop: 4, color: 'var(--text-muted)' }}>{deal.subtitle}</p>}
        </div>
        <Countdown endsAt={deal.endsAt!} />
      </div>
      <ProductGrid products={products} />
    </section>
  )
}

function Countdown({ endsAt }: { endsAt: string }) {
  const target = new Date(endsAt).getTime()
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(id)
  }, [target])

  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--orange-50)',
        color: 'var(--orange-700)',
        font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)',
      }}
    >
      <Icon name="clock" size={14} />
      {String(days).padStart(2, '0')}D : {String(hours).padStart(2, '0')}H : {String(minutes).padStart(2, '0')}M : {String(seconds).padStart(2, '0')}S
    </div>
  )
}

export function TestimonialSection() {
  const review = getApprovedReviews()[0]
  if (!review) return null

  return (
    <section className="container-page">
      <div style={{ background: 'var(--ink-900)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12) var(--sp-8)', display: 'grid', justifyItems: 'center', gap: 'var(--sp-4)', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-800)', color: '#fff', display: 'grid', placeItems: 'center', font: '800 20px/1 var(--font-display)' }}>
          {review.author.charAt(0)}
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="star" size={16} color={i < review.rating ? 'var(--orange-400)' : 'var(--ink-700)'} />
          ))}
        </div>
        <p style={{ font: '600 clamp(18px, 2.2vw, 24px)/1.5 var(--font-display)', color: '#fff', maxWidth: 560 }}>“{review.comment}”</p>
        <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--gray-300)' }}>{review.author}, verified customer</div>
        <Link to="/shop" style={{ marginTop: 'var(--sp-2)', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: '#fff', textDecoration: 'none' }}>
          Shop what they bought →
        </Link>
      </div>
    </section>
  )
}

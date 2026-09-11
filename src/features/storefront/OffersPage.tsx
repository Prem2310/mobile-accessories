import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Button } from '../../components/ds/Button'
import { OfferBanner } from '../../components/ds/OfferBanner'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getActiveOffers } from '../../lib/catalog'

export function OffersPage() {
  const offers = getActiveOffers()
  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, 'Offers']} />
      <SectionHeading title="Current offers" subtitle={offers.length > 0 ? `${offers.length} running now` : undefined} />
      <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
        {offers.map((o) => (
          <OfferBanner
            key={o.id}
            title={o.title}
            subtitle={o.subtitle}
            tone={o.tone}
            cta={
              o.ctaHref ? (
                <Link to={o.ctaHref}>
                  <Button variant={o.tone === 'navy' ? 'primary' : 'secondary'}>{o.ctaLabel}</Button>
                </Link>
              ) : o.ctaLabel ? (
                <Button variant={o.tone === 'navy' ? 'primary' : 'secondary'}>{o.ctaLabel}</Button>
              ) : undefined
            }
          />
        ))}
        {offers.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No active offers right now — check back soon.</p>}
      </div>
    </div>
  )
}

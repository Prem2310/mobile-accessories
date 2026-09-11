import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getProducts } from '../../lib/catalog'
import { useWishlistStore } from '../../store/wishlist'
import { ProductGrid } from './ProductGrid'

export function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds)
  const items = getProducts().filter((p) => productIds.includes(p.id))

  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, 'Wishlist']} />
      <SectionHeading eyebrow="Saved" title="Your wishlist" />
      {items.length === 0 ? (
        <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-20) 0', textAlign: 'center' }}>
          <Icon name="heart" size={40} color="var(--gray-300)" />
          <div style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>Nothing saved yet</div>
          <p style={{ color: 'var(--text-muted)', maxWidth: 320 }}>Tap the heart on any product to save it here.</p>
          <Link to="/shop">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  )
}

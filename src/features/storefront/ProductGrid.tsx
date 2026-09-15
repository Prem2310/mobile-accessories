import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../../components/ds/ProductCard'
import { Icon } from '../../components/ds/Icon'
import { getDisplayPrice } from '../../lib/catalog'
import type { Product } from '../../lib/types'
import { useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { QuickViewModal } from './QuickViewModal'

export function ProductGrid({ products }: { products: Product[] }) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const wishlisted = useWishlistStore((s) => s.productIds)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  if (products.length === 0) {
    return (
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-20) 0', textAlign: 'center' }}>
        <Icon name="package" size={40} color="var(--gray-300)" />
        <div style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>No products found</div>
        <p style={{ color: 'var(--text-muted)', maxWidth: 320 }}>Try clearing a filter or searching a different phone model.</p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-2 sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]"
      style={{ gap: 'var(--sp-4)' }}
    >
      {products.map((p) => {
        const { price, mrp, stock } = getDisplayPrice(p)
        return (
          <ProductCard
            key={p.id}
            title={p.title}
            subtitle={p.shortDescription}
            price={price}
            mrp={mrp}
            rating={p.rating}
            reviews={p.reviewCount}
            badge={
              stock <= 0
                ? { label: 'Out of stock', tone: 'out' }
                : p.newArrival
                  ? { label: 'New', tone: 'new' }
                  : mrp && mrp > price
                    ? { label: `${Math.round((1 - price / mrp) * 100)}% off` }
                    : undefined
            }
            image={p.images[0]}
            wishlisted={wishlisted.includes(p.id)}
            onWishlist={() => toggleWishlist(p.id)}
            onClick={() => navigate(`/products/${p.slug}`)}
            onAdd={() => {
              if (stock <= 0) return
              addItem({
                productId: p.id,
                title: p.title,
                price,
                slug: p.slug,
                quantity: 1,
                image: p.images[0],
              })
            }}
            onQuickView={() => setQuickViewProduct(p)}
          />
        )
      })}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}

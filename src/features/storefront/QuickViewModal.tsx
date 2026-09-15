import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Price } from '../../components/ds/Price'
import { QuantityStepper } from '../../components/ds/QuantityStepper'
import { Rating } from '../../components/ds/Rating'
import { getDisplayPrice } from '../../lib/catalog'
import type { Product } from '../../lib/types'
import { useCartStore } from '../../store/cart'

export interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
}

/** Lightweight quick-add modal — original implementation, opened from the product-card eye icon so a shopper can add to cart without leaving the grid. */
export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)

  const { price, mrp, stock } = product ? getDisplayPrice(product) : { price: 0, mrp: undefined, stock: 0 }

  const add = () => {
    if (!product) return
    addItem({
      productId: product.id,
      title: product.title,
      price,
      slug: product.slug,
      quantity: qty,
      image: product.images[0],
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 70 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.3, 1] }}
            style={{
              position: 'fixed',
              zIndex: 71,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(640px, 92vw)',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              style={{ position: 'absolute', top: 12, right: 12, border: 0, background: 'var(--gray-50)', borderRadius: '50%', width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 1 }}
            >
              <Icon name="x" size={16} />
            </button>

            <div className="grid md:grid-cols-2" style={{ gap: 0 }}>
              <div style={{ aspectRatio: '1/1', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ font: 'var(--fw-bold) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-faint)' }}>Product photo</span>
                )}
              </div>

              <div style={{ padding: 'var(--sp-6)', display: 'grid', gap: 'var(--sp-3)', alignContent: 'start' }}>
                <h2 style={{ font: '700 clamp(18px, 2.4vw, 22px)/1.3 var(--font-display)', color: 'var(--text-strong)' }}>{product.title}</h2>
                {product.rating != null && <Rating value={product.rating} count={product.reviewCount} />}
                <Price amount={price} mrp={mrp} />
                {product.shortDescription && <p style={{ color: 'var(--text-muted)', font: 'var(--fw-medium) var(--fs-sm)/1.5 var(--font-body)' }}>{product.shortDescription}</p>}

                {stock > 0 ? (
                  <>
                    <QuantityStepper value={qty} onChange={setQty} min={1} max={stock} />
                    <Button onClick={add} fullWidth>Add to cart</Button>
                  </>
                ) : (
                  <Button disabled fullWidth>Out of stock</Button>
                )}

                <Link to={`/products/${product.slug}`} onClick={onClose} style={{ textAlign: 'center', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', textDecoration: 'underline' }}>
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

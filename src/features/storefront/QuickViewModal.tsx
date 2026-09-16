import { useState, type CSSProperties } from 'react'
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

const arrowBtnStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  translate: '0 -50%',
  border: 0,
  background: 'rgba(255,255,255,0.9)',
  borderRadius: '50%',
  width: 36,
  height: 36,
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-sm)',
}

/** Lightweight quick-add modal — original implementation, opened from the product-card eye icon so a shopper can add to cart without leaving the grid. */
export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const { price, mrp, stock } = product ? getDisplayPrice(product) : { price: 0, mrp: undefined, stock: 0 }
  const images = product?.images ?? []

  const goTo = (next: number) => {
    if (!images.length) return
    setDirection(next > imageIndex ? 1 : -1)
    setImageIndex((next + images.length) % images.length)
  }

  const handleClose = () => {
    setImageIndex(0)
    onClose()
  }

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
    handleClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--sp-4)',
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.3, 1] }}
            style={{
              position: 'relative',
              width: 'min(640px, 100%)',
              maxHeight: '100%',
              overflowY: 'auto',
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <button
              onClick={handleClose}
              aria-label="Close quick view"
              style={{ position: 'absolute', top: 12, right: 12, border: 0, background: 'var(--gray-50)', borderRadius: '50%', width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 2 }}
            >
              <Icon name="x" size={16} />
            </button>

            <div className="grid md:grid-cols-2" style={{ gap: 0 }}>
              <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  {images[imageIndex] ? (
                    <motion.img
                      key={imageIndex}
                      src={images[imageIndex]}
                      alt={product.title}
                      custom={direction}
                      initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: 'var(--fw-bold) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-faint)' }}>
                      Product photo
                    </span>
                  )}
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button aria-label="Previous photo" onClick={() => goTo(imageIndex - 1)} style={{ ...arrowBtnStyle, left: 10 }}>
                      <Icon name="chevron-left" size={18} />
                    </button>
                    <button aria-label="Next photo" onClick={() => goTo(imageIndex + 1)} style={{ ...arrowBtnStyle, right: 10 }}>
                      <Icon name="chevron-right" size={18} />
                    </button>
                    <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
                      {images.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`Photo ${i + 1}`}
                          onClick={() => goTo(i)}
                          style={{ width: 6, height: 6, borderRadius: '50%', border: 0, padding: 0, cursor: 'pointer', background: i === imageIndex ? 'var(--white)' : 'rgba(255,255,255,0.5)' }}
                        />
                      ))}
                    </div>
                  </>
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

                <Link to={`/products/${product.slug}`} onClick={handleClose} style={{ textAlign: 'center', font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--ink-900)', textDecoration: 'underline' }}>
                  View full details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

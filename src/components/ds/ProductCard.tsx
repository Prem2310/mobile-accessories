import { useState, type CSSProperties, type MouseEvent, type MouseEventHandler } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Badge, type BadgeTone } from './Badge'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { Price } from './Price'
import { Rating } from './Rating'

export interface ProductCardProps {
  title: string
  subtitle?: string
  price: number
  mrp?: number
  badge?: { label: string; tone?: BadgeTone }
  rating?: number
  reviews?: number
  image?: string
  images?: string[]
  imageAlt?: string
  wishlisted?: boolean
  onAdd?: () => void
  onWishlist?: () => void
  onQuickView?: () => void
  onClick?: MouseEventHandler
  style?: CSSProperties
  className?: string
}

const cardArrowStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  translate: '0 -50%',
  border: 0,
  background: 'rgba(255,255,255,0.9)',
  borderRadius: '50%',
  width: 28,
  height: 28,
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
}

export function ProductCard({
  title,
  subtitle,
  price,
  mrp,
  badge,
  rating,
  reviews,
  image,
  images,
  imageAlt = '',
  wishlisted = false,
  onAdd,
  onWishlist,
  onQuickView,
  onClick,
  style,
  className,
}: ProductCardProps) {
  const [hover, setHover] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const gallery = images?.length ? images : image ? [image] : []

  const goTo = (e: MouseEvent, next: number) => {
    e.stopPropagation()
    if (!gallery.length) return
    setDirection(next > imageIndex ? 1 : -1)
    setImageIndex((next + gallery.length) % gallery.length)
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{ cursor: 'pointer', ...style }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        {gallery.length ? (
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={imageIndex}
              src={gallery[imageIndex]}
              alt={imageAlt}
              custom={direction}
              initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.3, 1] }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </AnimatePresence>
        ) : (
          <span style={{ font: 'var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--text-faint)', textAlign: 'center', padding: 'var(--sp-4)' }}>
            Product photo
          </span>
        )}
        {gallery.length > 1 && (
          <>
            <button aria-label="Previous photo" onClick={(e) => goTo(e, imageIndex - 1)} style={{ ...cardArrowStyle, left: 6, opacity: hover ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)' }}>
              <Icon name="chevron-left" size={14} />
            </button>
            <button aria-label="Next photo" onClick={(e) => goTo(e, imageIndex + 1)} style={{ ...cardArrowStyle, right: 6, opacity: hover ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)' }}>
              <Icon name="chevron-right" size={14} />
            </button>
            <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {gallery.map((_, i) => (
                <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: i === imageIndex ? 'var(--white)' : 'rgba(255,255,255,0.5)' }} />
              ))}
            </div>
          </>
        )}
        {badge && (
          <span style={{ position: 'absolute', top: 'var(--sp-3)', left: 'var(--sp-3)' }}>
            <Badge tone={badge.tone ?? 'sale'}>{badge.label}</Badge>
          </span>
        )}
        <span style={{ position: 'absolute', top: 'var(--sp-2)', right: 'var(--sp-2)', opacity: hover || wishlisted ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)' }}>
          <IconButton
            label="Add to wishlist"
            tone="brand"
            size={36}
            active={wishlisted}
            onClick={(e) => {
              e.stopPropagation()
              onWishlist?.()
            }}
          >
            <Icon name="heart" size={16} />
          </IconButton>
        </span>
        {onQuickView && (
          <span style={{ position: 'absolute', top: 'var(--sp-2)', right: 42, opacity: hover ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)' }}>
            <IconButton
              label="Quick view"
              tone="brand"
              size={36}
              onClick={(e) => {
                e.stopPropagation()
                onQuickView()
              }}
            >
              <Icon name="eye" size={16} />
            </IconButton>
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.()
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 38,
            border: 0,
            background: 'var(--ink-900)',
            color: '#fff',
            font: 'var(--fw-bold) 11px/1 var(--font-body)',
            letterSpacing: '.06em',
            cursor: 'pointer',
            transform: hover ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform var(--dur-base) var(--ease-out)',
          }}
        >
          QUICK ADD
        </button>
      </div>
      <div style={{ padding: 'var(--sp-3) 0 0', display: 'grid', gap: 4 }}>
        <div
          style={{
            font: 'var(--fw-semibold) var(--fs-sm)/1.35 var(--font-body)',
            color: 'var(--text-strong)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </div>
        <div
          style={{
            font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)',
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 31,
          }}
        >
          {subtitle}
        </div>
        <div style={{ minHeight: 22, display: 'flex', alignItems: 'center' }}>{rating != null && <Rating value={rating} count={reviews} />}</div>
        <Price amount={price} mrp={mrp} />
      </div>
    </div>
  )
}

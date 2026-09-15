import { useState, type CSSProperties, type MouseEventHandler } from 'react'
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
  imageAlt?: string
  wishlisted?: boolean
  onAdd?: () => void
  onWishlist?: () => void
  onQuickView?: () => void
  onClick?: MouseEventHandler
  style?: CSSProperties
  className?: string
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
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{ cursor: 'pointer', ...style }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        {image ? (
          <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        ) : (
          <span style={{ font: 'var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--text-faint)', textAlign: 'center', padding: 'var(--sp-4)' }}>
            Product photo
          </span>
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

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
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        transform: hover ? 'var(--lift-hover)' : 'none',
        transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center' }}>
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
      </div>
      <div style={{ padding: 'var(--sp-4)', display: 'grid', gap: 'var(--sp-2)' }}>
        <div
          style={{
            font: 'var(--fw-bold) var(--fs-base)/1.3 var(--font-body)',
            color: 'var(--text-strong)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </div>
        {subtitle && <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)', color: 'var(--text-muted)' }}>{subtitle}</div>}
        {rating != null && <Rating value={rating} count={reviews} />}
        <Price amount={price} mrp={mrp} />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.()
          }}
          style={{
            marginTop: 'var(--sp-1)',
            height: 'var(--control-sm)',
            border: '1.5px solid var(--orange-500)',
            borderRadius: 'var(--radius-pill)',
            background: hover ? 'var(--orange-500)' : 'var(--orange-50)',
            color: hover ? 'var(--white)' : 'var(--orange-600)',
            font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)',
            cursor: 'pointer',
            transition: 'var(--transition-control)',
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Badge } from '../../components/ds/Badge'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { IconButton } from '../../components/ds/IconButton'
import { Price } from '../../components/ds/Price'
import { QuantityStepper } from '../../components/ds/QuantityStepper'
import { Rating } from '../../components/ds/Rating'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { Tabs } from '../../components/ds/Tabs'
import { getProductBySlug, getRelatedProducts, getReviewsForProduct, getSiteSettings } from '../../lib/catalog'
import { buildProductEnquiryMessage, buildProductOrderMessage, waLink } from '../../lib/whatsapp'
import { useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { ProductGrid } from './ProductGrid'

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const settings = getSiteSettings()
  const [variantIndex, setVariantIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('description')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  useEffect(() => setActiveImageIndex(0), [product?.id])
  const activeImage = product?.images[activeImageIndex] ?? product?.images[0]
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.open)
  const wishlisted = useWishlistStore((s) => s.has(product?.id ?? ''))
  const toggleWishlist = useWishlistStore((s) => s.toggle)

  const relatedProducts = product ? getRelatedProducts(product) : []
  const reviews = product ? getReviewsForProduct(product.id) : []

  const variant = product?.variants?.[variantIndex]
  const price = variant?.price ?? product?.price ?? 0
  const mrp = variant?.mrp ?? product?.mrp
  const stock = variant ? variant.stock : (product?.stock ?? 0)
  const outOfStock = stock <= 0

  const whatsappMessage = useMemo(() => (product ? buildProductOrderMessage(settings, product, { variant, quantity }) : ''), [product, settings, variant, quantity])

  if (!slug) return <Navigate to="/shop" replace />
  if (!product) {
    return (
      <div className="container-page py-20" style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-4)', textAlign: 'center' }}>
        <Icon name="package" size={40} color="var(--gray-300)" />
        <div style={{ font: 'var(--type-h2)', color: 'var(--text-strong)' }}>Product unavailable</div>
        <p style={{ color: 'var(--text-muted)' }}>This product may have been removed or renamed.</p>
        <Link to="/shop">
          <Button>Back to shop</Button>
        </Link>
      </div>
    )
  }

  const addToCart = () => {
    if (outOfStock) return
    addItem({
      productId: product.id,
      variantId: variant?.id,
      title: product.title,
      variantLabel: variant ? Object.values(variant.attributes).join(', ') : undefined,
      price,
      quantity,
      slug: product.slug,
      image: product.images[0],
    })
    openCart()
  }

  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)', paddingBottom: 'calc(var(--sp-12) + 80px)' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, product.title]} />

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--sp-10)' }}>
        {/* Gallery */}
        <div style={{ display: 'grid', gap: 'var(--sp-3)' }}>
          <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', display: 'grid', placeItems: 'center', border: '1px dashed var(--border-default)', overflow: 'hidden' }}>
            {activeImage ? (
              <img src={activeImage} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ font: 'var(--fw-bold) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-faint)' }}>Product photo</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImageIndex(i)}
                  style={{
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    padding: 0,
                    border: '2px solid ' + (i === activeImageIndex ? 'var(--ink-900)' : 'var(--border-subtle)'),
                    background: 'var(--surface-sunken)',
                    cursor: 'pointer',
                  }}
                  aria-label={`Photo ${i + 1}`}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy panel */}
        <div style={{ display: 'grid', gap: 'var(--sp-4)', alignContent: 'start', position: 'sticky', top: 110 }} className="md:sticky">
          <div>
            {product.newArrival && (
              <span style={{ display: 'inline-block', marginBottom: 'var(--sp-2)' }}>
                <Badge tone="new">Just in</Badge>
              </span>
            )}
            <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>{product.title}</h1>
            {product.shortDescription && <p style={{ marginTop: 'var(--sp-2)', color: 'var(--text-muted)' }}>{product.shortDescription}</p>}
          </div>

          {product.rating != null && <Rating value={product.rating} count={product.reviewCount} />}

          <Price amount={price} mrp={mrp} size="lg" />

          {outOfStock ? (
            <Badge tone="out">Out of stock</Badge>
          ) : stock <= 5 ? (
            <Badge tone="warn">Only {stock} left</Badge>
          ) : (
            <Badge tone="stock">In stock</Badge>
          )}

          {product.variants && product.variants.length > 0 && (
            <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
              <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>{product.variantLabel ?? 'Variant'}</div>
              <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantIndex(i)}
                    disabled={v.stock <= 0}
                    style={{
                      padding: '0 var(--sp-4)',
                      height: 'var(--control-sm)',
                      borderRadius: 'var(--radius-pill)',
                      border: '1.5px solid ' + (i === variantIndex ? 'var(--ink-900)' : 'var(--border-default)'),
                      background: i === variantIndex ? 'var(--gray-50)' : 'var(--white)',
                      color: v.stock <= 0 ? 'var(--text-faint)' : 'var(--text-strong)',
                      font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)',
                      cursor: v.stock <= 0 ? 'not-allowed' : 'pointer',
                      textDecoration: v.stock <= 0 ? 'line-through' : 'none',
                    }}
                  >
                    {Object.values(v.attributes).join(', ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, stock)} />
          </div>

          <div className="hidden md:grid" style={{ gap: 'var(--sp-3)' }}>
            <Button variant="outline" fullWidth disabled={outOfStock} onClick={addToCart}>
              Add to cart
            </Button>
            <Button
              as="a"
              variant="whatsapp"
              fullWidth
              href={waLink(settings.whatsappNumber, whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              iconLeft={<Icon name="message-circle" size={18} />}
            >
              Order on WhatsApp
            </Button>
            <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
              <Button
                as="a"
                variant="ghost"
                fullWidth
                href={waLink(settings.whatsappNumber, buildProductEnquiryMessage(settings, product))}
                target="_blank"
                rel="noreferrer"
              >
                Ask about product
              </Button>
              <IconButton label="Wishlist" tone={wishlisted ? 'brand' : 'neutral'} active={wishlisted} onClick={() => toggleWishlist(product.id)}>
                <Icon name="heart" size={18} />
              </IconButton>
              <IconButton label="Share" tone="neutral" onClick={() => shareProduct(product.title)}>
                <Icon name="share-2" size={18} />
              </IconButton>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 'var(--sp-2)', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--border-subtle)' }}>
            {product.warranty && (
              <span style={{ display: 'flex', gap: 'var(--sp-2)', font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-muted)' }}>
                <Icon name="shield-check" size={16} color="var(--gray-400)" />
                {product.warranty}
              </span>
            )}
            {product.deliveryInfo && (
              <span style={{ display: 'flex', gap: 'var(--sp-2)', font: 'var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)', color: 'var(--text-muted)' }}>
                <Icon name="truck" size={16} color="var(--gray-400)" />
                {product.deliveryInfo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: description / specs / reviews */}
      <div style={{ display: 'grid', gap: 'var(--sp-5)' }}>
        <Tabs
          items={[
            { value: 'description', label: 'Description' },
            { value: 'specifications', label: 'Specifications' },
            { value: 'reviews', label: `Reviews (${reviews.length})` },
          ]}
          value={tab}
          onChange={setTab}
        />
        {tab === 'description' && (
          <p style={{ color: 'var(--text-body)', maxWidth: 720, lineHeight: 1.6 }}>{product.description ?? product.shortDescription}</p>
        )}
        {tab === 'specifications' && (
          <div style={{ display: 'grid', gap: 'var(--sp-2)', maxWidth: 480 }}>
            {(product.specifications ?? []).map((s) => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--sp-2) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ color: 'var(--text-strong)', fontWeight: 'var(--fw-semibold)' }}>{s.value}</span>
              </div>
            ))}
            {(!product.specifications || product.specifications.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No specifications listed yet.</p>}
          </div>
        )}
        {tab === 'reviews' && (
          <div style={{ display: 'grid', gap: 'var(--sp-4)', maxWidth: 560 }}>
            {reviews.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No reviews yet — be the first to order and review.</p>}
            {reviews.map((r) => (
              <div key={r.id} style={{ display: 'grid', gap: 'var(--sp-1)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <Rating value={r.rating} />
                  <span style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>{r.author}</span>
                  {r.verified && <Badge tone="stock">Verified</Badge>}
                </div>
                <p style={{ color: 'var(--text-body)' }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <SectionHeading title="You may also like" />
          <ProductGrid products={relatedProducts} />
        </div>
      )}

      {/* Sticky mobile buy bar */}
      <div
        className="md:hidden flex"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 'calc(64px + env(safe-area-inset-bottom))',
          zIndex: 35,
          background: 'var(--white)',
          borderTop: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sticky)',
          padding: 'var(--sp-3) var(--gutter-mobile)',
          gap: 'var(--sp-2)',
        }}
      >
        <Button variant="outline" disabled={outOfStock} onClick={addToCart} style={{ flex: 1 }}>
          Add to cart
        </Button>
        <Button
          as="a"
          variant="whatsapp"
          href={waLink(settings.whatsappNumber, whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          style={{ flex: 1 }}
        >
          Order on WhatsApp
        </Button>
      </div>
    </div>
  )
}

function shareProduct(title: string) {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ title, url }).catch(() => {})
  } else {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard')
  }
}

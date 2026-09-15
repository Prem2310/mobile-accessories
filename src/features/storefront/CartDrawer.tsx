import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { IconButton } from '../../components/ds/IconButton'
import { QuantityStepper } from '../../components/ds/QuantityStepper'
import { getBestsellers, getDisplayPrice, getSiteSettings } from '../../lib/catalog'
import { formatINR } from '../../lib/format'
import { buildCartMessage, waLink } from '../../lib/whatsapp'
import { useCartStore, useCartTotal } from '../../store/cart'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const items = useCartStore((s) => s.items)
  const close = useCartStore((s) => s.close)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const addItem = useCartStore((s) => s.addItem)
  const total = useCartTotal()
  const settings = getSiteSettings()
  const remaining = Math.max(0, settings.freeDeliveryThreshold - total)
  const progress = Math.min(100, (total / settings.freeDeliveryThreshold) * 100)
  const crossSell = getBestsellers(6).filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 3)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{ position: 'fixed', inset: 0, background: 'rgba(6,23,56,.45)', zIndex: 60 }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0.8, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(420px, 100vw)',
              background: 'var(--surface-page)',
              zIndex: 61,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-hover)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5)', background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>Your cart</div>
              <IconButton label="Close cart" onClick={close}>
                <Icon name="x" size={20} />
              </IconButton>
            </div>

            {items.length > 0 && (
              <div style={{ padding: 'var(--sp-4) var(--sp-5)', background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--text-muted)', marginBottom: 8 }}>
                  {remaining > 0 ? (
                    <>Add <strong style={{ color: 'var(--ink-900)' }}>{formatINR(remaining)}</strong> more for free delivery</>
                  ) : (
                    <span style={{ color: 'var(--ink-900)', fontWeight: 700 }}>You've unlocked free delivery</span>
                  )}
                </div>
                <div style={{ height: 4, borderRadius: 999, background: 'var(--gray-200)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'var(--ink-900)', transition: 'width var(--dur-base) var(--ease-out)' }} />
                </div>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--sp-5)', display: 'grid', gap: 'var(--sp-4)', alignContent: 'start' }}>
              {items.length === 0 ? (
                <EmptyCart onClose={close} />
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}::${item.variantId ?? ''}`} style={{ display: 'flex', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--sp-3)' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', flex: '0 0 auto', display: 'grid', placeItems: 'center' }}>
                      {item.image ? (
                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      ) : (
                        <Icon name="smartphone" size={22} color="var(--gray-400)" />
                      )}
                    </div>
                    <div style={{ flex: 1, display: 'grid', gap: 4 }}>
                      <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)', color: 'var(--text-strong)' }}>{item.title}</div>
                      {item.variantLabel && <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-muted)' }}>{item.variantLabel}</div>}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                        <QuantityStepper value={item.quantity} onChange={(v) => setQuantity(item.productId, v, item.variantId)} />
                        <span style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--price)' }}>{formatINR(item.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer', alignSelf: 'start' }}
                    >
                      <Icon name="trash-2" size={16} />
                    </button>
                  </div>
                ))
              )}

              {items.length > 0 && crossSell.length > 0 && (
                <div>
                  <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)', marginBottom: 10 }}>You may also like</div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {crossSell.map((p) => {
                      const { price } = getDisplayPrice(p)
                      return (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                          <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
                            {p.images[0] && <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                            <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--price)' }}>{formatINR(price)}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => addItem({ productId: p.id, title: p.title, price, slug: p.slug, quantity: 1, image: p.images[0] })}
                            style={{ border: '1.5px solid var(--ink-900)', borderRadius: 999, background: 'transparent', color: 'var(--ink-900)', width: 28, height: 28, cursor: 'pointer', flexShrink: 0 }}
                          >
                            +
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: 'var(--sp-5)', background: 'var(--white)', borderTop: '1px solid var(--border-subtle)', display: 'grid', gap: 'var(--sp-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--fw-bold) var(--fs-lg)/1 var(--font-body)', color: 'var(--text-strong)' }}>
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
                <Button
                  as="a"
                  href={waLink(settings.whatsappNumber, buildCartMessage(settings, items))}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  fullWidth
                  iconLeft={<Icon name="message-circle" size={18} />}
                >
                  Send cart to WhatsApp
                </Button>
                <Button variant="ghost" fullWidth onClick={close}>
                  Continue shopping
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-12) 0', textAlign: 'center' }}>
      <Icon name="shopping-bag" size={40} color="var(--gray-300)" />
      <div style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>Your cart is empty</div>
      <p style={{ color: 'var(--text-muted)', maxWidth: 240 }}>Add a few things you like — checkout happens right on WhatsApp.</p>
      <Link to="/shop" onClick={onClose}>
        <Button>Start shopping</Button>
      </Link>
    </div>
  )
}

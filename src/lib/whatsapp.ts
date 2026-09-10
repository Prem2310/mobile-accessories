import type { CartItem, Product, ProductVariant, SiteSettings } from './types'
import { formatINR } from './format'

/**
 * WhatsApp click-to-chat (`wa.me`) only pre-fills text — there's no parameter for attaching a
 * file — so every message includes a link (product page, and photo URL once Storage exists in
 * Phase 5) instead of an attachment. This is the ordering flow: no on-site checkout.
 */
export function waLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

function productUrl(slug: string): string {
  if (typeof window === 'undefined') return `/products/${slug}`
  return `${window.location.origin}/products/${slug}`
}

export function buildProductOrderMessage(
  settings: SiteSettings,
  product: Product,
  opts: { variant?: ProductVariant; quantity?: number } = {},
): string {
  const { variant, quantity = 1 } = opts
  const price = variant?.price ?? product.price
  const lines = [
    `Hi ${settings.storeName}, I want to order:`,
    '',
    `Product: ${product.title}`,
    ...(variant ? [`Variant: ${Object.values(variant.attributes).join(', ')}`] : []),
    `Quantity: ${quantity}`,
    `Price: ${formatINR(price * quantity)}`,
    '',
    `Photo/details: ${productUrl(product.slug)}`,
  ]
  return lines.join('\n')
}

export function buildProductEnquiryMessage(settings: SiteSettings, product: Product): string {
  return [
    `Hi ${settings.storeName}, I have a question about:`,
    '',
    `Product: ${product.title}`,
    `Link: ${productUrl(product.slug)}`,
  ].join('\n')
}

export function buildCartMessage(settings: SiteSettings, items: CartItem[]): string {
  const lines = [
    `Hi ${settings.storeName}, I want to order:`,
    '',
    ...items.map((it, i) => {
      const variant = it.variantLabel ? ` (${it.variantLabel})` : ''
      return `${i + 1}. ${it.title}${variant} x${it.quantity} — ${formatINR(it.price * it.quantity)}`
    }),
    '',
    `Total: ${formatINR(items.reduce((sum, it) => sum + it.price * it.quantity, 0))}`,
  ]
  return lines.join('\n')
}

export function buildGeneralEnquiryMessage(settings: SiteSettings): string {
  return `Hi ${settings.storeName}, I'd like to know more about your products.`
}

import type { CartItem, Product, ProductVariant, SiteSettings } from './types'
import { formatINR } from './format'

/**
 * WhatsApp click-to-chat (`wa.me`) only pre-fills text — there's no parameter for attaching a
 * file — so every message includes a link instead of an attachment: the product's photo URL
 * (Supabase Storage) when one has been uploaded, else the product page. This is the ordering
 * flow: no on-site checkout.
 */
export function waLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

function productUrl(slug: string): string {
  if (typeof window === 'undefined') return `/products/${slug}`
  return `${window.location.origin}/products/${slug}`
}

function photoOrProductUrl(image: string | undefined, slug: string): string {
  return image || productUrl(slug)
}

export function buildProductOrderMessage(
  settings: SiteSettings,
  product: Product,
  opts: { variant?: ProductVariant; quantity?: number } = {},
): string {
  const { variant, quantity = 1 } = opts
  const price = variant?.price ?? product.price
  const lines = [
    `Hi ${settings.storeName}, I'd like to order the following:`,
    '',
    `Product: ${product.title}`,
    ...(variant ? [`Variant: ${Object.values(variant.attributes).join(', ')}`] : []),
    `Quantity: ${quantity}`,
    `Price: ${formatINR(price * quantity)}`,
    `Photo: ${photoOrProductUrl(product.images?.[0], product.slug)}`,
    '',
    'Please confirm availability and pickup time. Thank you!',
  ]
  return lines.join('\n')
}

export function buildProductEnquiryMessage(settings: SiteSettings, product: Product): string {
  return [
    `Hi ${settings.storeName}, I have a question about this product:`,
    '',
    `Product: ${product.title}`,
    `Photo: ${photoOrProductUrl(product.images?.[0], product.slug)}`,
    '',
    'Could you share more details? Thank you!',
  ].join('\n')
}

export function buildCartMessage(settings: SiteSettings, items: CartItem[]): string {
  const lines = [
    `Hi ${settings.storeName}, I'd like to order the following:`,
    '',
    ...items.flatMap((it, i) => {
      const variant = it.variantLabel ? ` (${it.variantLabel})` : ''
      return [
        `${i + 1}. ${it.title}${variant} x${it.quantity} — ${formatINR(it.price * it.quantity)}`,
        `   Photo: ${photoOrProductUrl(it.image, it.slug)}`,
      ]
    }),
    '',
    `Total: ${formatINR(items.reduce((sum, it) => sum + it.price * it.quantity, 0))}`,
    '',
    'Please confirm availability and pickup time. Thank you!',
  ]
  return lines.join('\n')
}

export function buildGeneralEnquiryMessage(settings: SiteSettings): string {
  return `Hi ${settings.storeName}, I'd like to know more about your products. Could you help me out?`
}

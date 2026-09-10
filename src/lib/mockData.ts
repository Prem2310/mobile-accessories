import type { Category, Offer, Product, Review, SiteSettings } from './types'

/**
 * Stand-in catalog so the storefront looks complete before Supabase is wired in (Phase 5).
 * Shaped to match the eventual `categories`/`products`/`product_variants` tables so swapping
 * this module for real queries later is a drop-in change, not a rewrite.
 * No real Raghav prices/stock/claims — placeholders only, per the brief's own instruction.
 */

export const siteSettings: SiteSettings = {
  storeName: 'Raghav Mobile Accessories',
  area: 'Vastral, Ahmedabad',
  hours: '10:00 am – 10:00 pm, all days',
  whatsappNumber: '919999999999',
  instagramHandle: '@raghavmobile',
  gstNumber: '24XXXXX1234X1ZX',
  whatsappOrderTemplate: 'Hi {{store}}, I want to order:\n{{items}}\nTotal: {{total}}',
  whatsappEnquiryTemplate: 'Hi {{store}}, I have a question about {{product}}.',
  freeDeliveryThreshold: 499,
}

export const categories: Category[] = [
  { id: 'cat-cases', slug: 'phone-cases', name: 'Phone Cases', icon: 'smartphone', order: 1, enabled: true },
  { id: 'cat-glass', slug: 'screen-protectors', name: 'Screen Protectors', icon: 'shield-check', order: 2, enabled: true },
  { id: 'cat-chargers', slug: 'chargers', name: 'Chargers', icon: 'zap', order: 3, enabled: true },
  { id: 'cat-cables', slug: 'cables', name: 'Cables', icon: 'cable', order: 4, enabled: true },
  { id: 'cat-powerbanks', slug: 'power-banks', name: 'Power Banks', icon: 'battery-charging', order: 5, enabled: true },
  { id: 'cat-earphones', slug: 'earphones', name: 'Earphones', icon: 'headphones', order: 6, enabled: true },
  { id: 'cat-tws', slug: 'tws-earbuds', name: 'TWS / Earbuds', icon: 'headphones', order: 7, enabled: true },
  { id: 'cat-speakers', slug: 'speakers', name: 'Speakers', icon: 'zap', order: 8, enabled: true },
  { id: 'cat-holders', slug: 'mobile-holders', name: 'Mobile Holders', icon: 'smartphone', order: 9, enabled: true },
  { id: 'cat-car', slug: 'car-accessories', name: 'Car Accessories', icon: 'truck', order: 10, enabled: true },
  { id: 'cat-adapters', slug: 'adapters', name: 'Adapters', icon: 'zap', order: 11, enabled: true },
  { id: 'cat-gadgets', slug: 'smart-gadgets', name: 'Smart Gadgets', icon: 'zap', order: 12, enabled: true },
  { id: 'cat-other', slug: 'other-accessories', name: 'Other Accessories', icon: 'package', order: 13, enabled: true },
]

const compat = ['iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'Samsung S24', 'Samsung S24 Ultra', 'Redmi Note 13 Pro', 'OnePlus 12']

function variantsFor(productId: string, basePrice: number, baseMrp: number): Product['variants'] {
  return compat.slice(0, 4).map((model, i) => ({
    id: `${productId}-v${i}`,
    sku: `${productId.toUpperCase()}-${i}`,
    attributes: { Model: model },
    price: basePrice + i * 20,
    mrp: baseMrp + i * 20,
    stock: i === 3 ? 0 : 12 - i * 3,
  }))
}

export const products: Product[] = [
  {
    id: 'p1', slug: 'matte-silicone-case', title: 'Matte Silicone Case', shortDescription: '1.2mm shock corners, soft-touch matte finish',
    categoryId: 'cat-cases', images: [], price: 449, mrp: 699, rating: 4.6, reviewCount: 128, stock: 40,
    featured: true, bestseller: true, variantLabel: 'Model', variants: variantsFor('p1', 449, 699),
    compatibility: compat, warranty: '3 months against manufacturing defects', deliveryInfo: 'Free delivery in Vastral · ₹40 elsewhere in Ahmedabad',
    specifications: [{ label: 'Material', value: 'Liquid silicone' }, { label: 'Protection', value: 'Raised 1.2mm camera + edge bumper' }],
    tags: ['case', 'silicone'],
  },
  {
    id: 'p2', slug: 'clear-magsafe-case', title: 'Transparent MagSafe Case', shortDescription: 'Crystal-clear, magnetic ring built in',
    categoryId: 'cat-cases', images: [], price: 599, mrp: 899, rating: 4.5, reviewCount: 64, stock: 25,
    newArrival: true, variantLabel: 'Model', variants: variantsFor('p2', 599, 899), compatibility: compat.slice(0, 3),
    tags: ['case', 'magsafe'],
  },
  {
    id: 'p3', slug: '9h-tempered-glass', title: '9H Tempered Glass', shortDescription: 'Edge-to-edge, oleophobic coating',
    categoryId: 'cat-glass', images: [], price: 99, mrp: 199, rating: 4.4, reviewCount: 212, stock: 80,
    bestseller: true, variantLabel: 'Model', variants: variantsFor('p3', 99, 199), compatibility: compat,
    tags: ['glass'],
  },
  {
    id: 'p4', slug: 'privacy-screen-guard', title: 'Privacy Screen Guard', shortDescription: 'Anti-spy angle filter',
    categoryId: 'cat-glass', images: [], price: 349, mrp: 599, rating: 4.7, reviewCount: 34, stock: 18,
    tags: ['glass', 'privacy'],
  },
  {
    id: 'p5', slug: 'fast-usb-c-charger', title: 'Fast USB-C Charger 33W', shortDescription: 'PD + QC fast charging adapter',
    categoryId: 'cat-chargers', images: [], price: 649, mrp: 899, rating: 4.8, reviewCount: 96, stock: 30,
    featured: true, bestseller: true, specifications: [{ label: 'Output', value: '33W PD/QC' }, { label: 'Input', value: '100-240V' }],
    tags: ['charger'],
  },
  {
    id: 'p6', slug: 'wireless-charger-pad', title: 'Wireless Charger Pad', shortDescription: '15W fast wireless charging',
    categoryId: 'cat-chargers', images: [], price: 899, mrp: 1299, rating: 4.3, reviewCount: 21, stock: 12, newArrival: true,
    tags: ['charger', 'wireless'],
  },
  {
    id: 'p7', slug: 'braided-type-c-cable', title: 'Braided Type-C Cable 1.5m', shortDescription: '60W fast charge, nylon braided',
    categoryId: 'cat-cables', images: [], price: 199, mrp: 349, rating: 4.5, reviewCount: 143, stock: 60, bestseller: true,
    tags: ['cable'],
  },
  {
    id: 'p8', slug: 'lightning-cable', title: 'Lightning Cable 1m', shortDescription: 'MFi-style fast charge cable',
    categoryId: 'cat-cables', images: [], price: 249, mrp: 399, rating: 4.2, reviewCount: 58, stock: 22,
    tags: ['cable'],
  },
  {
    id: 'p9', slug: 'powerbank-10000mah', title: '10000mAh Slim Power Bank', shortDescription: '22.5W dual output, pocket slim',
    categoryId: 'cat-powerbanks', images: [], price: 1099, mrp: 1699, rating: 4.6, reviewCount: 71, stock: 15,
    featured: true, tags: ['powerbank'],
  },
  {
    id: 'p10', slug: 'powerbank-20000mah', title: '20000mAh Power Bank', shortDescription: 'Dual USB-A + USB-C PD',
    categoryId: 'cat-powerbanks', images: [], price: 1599, mrp: 2299, rating: 4.4, reviewCount: 29, stock: 9,
    tags: ['powerbank'],
  },
  {
    id: 'p11', slug: 'wired-earphones', title: 'Wired Earphones with Mic', shortDescription: 'In-line remote, deep bass',
    categoryId: 'cat-earphones', images: [], price: 249, mrp: 449, rating: 4.1, reviewCount: 88, stock: 35,
    tags: ['earphones'],
  },
  {
    id: 'p12', slug: 'tws-earbuds-pro', title: 'TWS Earbuds Pro', shortDescription: '40h playback, ENC mic, touch controls',
    categoryId: 'cat-tws', images: [], price: 1299, mrp: 2499, rating: 4.2, reviewCount: 163, stock: 20,
    bestseller: true, featured: true, tags: ['tws', 'earbuds'],
  },
  {
    id: 'p13', slug: 'anc-earbuds', title: 'ANC Earbuds', shortDescription: 'Active noise cancellation, 6h battery',
    categoryId: 'cat-tws', images: [], price: 1899, mrp: 3299, rating: 4.5, reviewCount: 42, stock: 11, newArrival: true,
    tags: ['tws', 'anc'],
  },
  {
    id: 'p14', slug: 'bluetooth-speaker', title: 'Portable Bluetooth Speaker', shortDescription: 'IPX5 splash resistant, 10h playback',
    categoryId: 'cat-speakers', images: [], price: 1499, mrp: 2199, rating: 4.3, reviewCount: 37, stock: 14,
    tags: ['speaker'],
  },
  {
    id: 'p15', slug: 'car-mobile-holder', title: 'Car Mobile Holder', shortDescription: '360° rotating dashboard mount',
    categoryId: 'cat-car', images: [], price: 349, mrp: 599, rating: 4.4, reviewCount: 66, stock: 28, bestseller: true,
    tags: ['car', 'holder'],
  },
  {
    id: 'p16', slug: 'car-charger-dual-usb', title: 'Car Charger Dual USB', shortDescription: '36W fast charge, 2 ports',
    categoryId: 'cat-car', images: [], price: 399, mrp: 649, rating: 4.2, reviewCount: 19, stock: 17,
    tags: ['car', 'charger'],
  },
  {
    id: 'p17', slug: 'desk-mobile-stand', title: 'Desk Mobile Stand', shortDescription: 'Adjustable angle, foldable aluminium',
    categoryId: 'cat-holders', images: [], price: 299, mrp: 499, rating: 4.5, reviewCount: 24, stock: 20,
    tags: ['holder', 'stand'],
  },
  {
    id: 'p18', slug: 'type-c-to-usb-adapter', title: 'Type-C to USB-A Adapter', shortDescription: 'OTG-ready, compact',
    categoryId: 'cat-adapters', images: [], price: 149, mrp: 249, rating: 4.0, reviewCount: 12, stock: 40,
    tags: ['adapter'],
  },
  {
    id: 'p19', slug: 'smart-watch-band', title: 'Smart Watch Strap', shortDescription: 'Silicone, sweat resistant',
    categoryId: 'cat-gadgets', images: [], price: 299, mrp: 499, rating: 4.1, reviewCount: 15, stock: 26, newArrival: true,
    tags: ['gadget', 'watch'],
  },
  {
    id: 'p20', slug: 'phone-sanitizer-stand', title: 'Phone Sanitiser & Charge Stand', shortDescription: 'UV clean + wireless charge',
    categoryId: 'cat-other', images: [], price: 1199, mrp: 1899, rating: 3.9, reviewCount: 8, stock: 6,
    tags: ['other'],
  },
]

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', author: 'Aakash P.', rating: 5, comment: 'Fits perfectly, matte feel is premium.', verified: true, createdAt: '2026-08-02', approved: true },
  { id: 'r2', productId: 'p1', author: 'Dhruvi S.', rating: 4, comment: 'Good grip, camera bump protected well.', verified: true, createdAt: '2026-08-14', approved: true },
  { id: 'r3', productId: 'p5', author: 'Kunal M.', rating: 5, comment: 'Charges fast, no heating issue.', verified: true, createdAt: '2026-07-28', approved: true },
  { id: 'r4', productId: 'p12', author: 'Riya J.', rating: 4, comment: 'Battery life is as advertised.', verified: false, createdAt: '2026-08-20', approved: true },
]

export const offers: Offer[] = [
  { id: 'o1', title: 'Free screen-guard fitting, every day', subtitle: 'Bring your phone to the Vastral store.', tone: 'navy', ctaLabel: 'Get directions', active: true },
  { id: 'o2', title: 'Flat 20% off on TWS earbuds', subtitle: 'This week only, while stocks last.', tone: 'orange', ctaLabel: 'Shop earbuds', ctaHref: '/category/tws-earbuds', active: true },
]

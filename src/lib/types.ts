import type { IconName } from '../components/ds/Icon'

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  icon?: IconName
  order: number
  enabled: boolean
  parentId?: string | null
  productCount?: number
}

export interface ProductVariant {
  id: string
  sku: string
  /** e.g. { Model: "iPhone 15 Pro" } — attribute set is admin-defined, not hard-coded to any brand */
  attributes: Record<string, string>
  price: number
  mrp?: number
  stock: number
  /** Optional — when set, selecting this variant swaps the PDP gallery to this photo. */
  imageUrl?: string
  /** Optional swatch color (hex) — when set alongside a "Color"-style attribute, renders as a color dot instead of a text pill. */
  swatchHex?: string
}

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  title: string
  shortDescription?: string
  description?: string
  categoryId: string
  subcategoryId?: string
  brand?: string
  compatibility?: string[]
  images: string[]
  price: number
  mrp?: number
  rating?: number
  reviewCount?: number
  stock: number
  featured?: boolean
  bestseller?: boolean
  newArrival?: boolean
  discountPercent?: number
  variantLabel?: string
  variants?: ProductVariant[]
  specifications?: ProductSpec[]
  warranty?: string
  deliveryInfo?: string
  tags?: string[]
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  verified?: boolean
  createdAt: string
  approved: boolean
}

export interface SiteSettings {
  storeName: string
  area: string
  address?: string
  hours: string
  whatsappNumber: string
  instagramHandle: string
  gstNumber?: string
  whatsappOrderTemplate: string
  whatsappEnquiryTemplate: string
  freeDeliveryThreshold: number
  heroEyebrow?: string
  heroHeadline?: string
  heroSubheadline?: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
}

export interface CartItem {
  productId: string
  variantId?: string
  title: string
  variantLabel?: string
  price: number
  image?: string
  quantity: number
  slug: string
}

export interface Offer {
  id: string
  title: string
  subtitle?: string
  tone: 'navy' | 'orange'
  ctaLabel?: string
  ctaHref?: string
  startsAt?: string
  endsAt?: string
  active: boolean
}

export interface Banner {
  id: string
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  imageDesktop?: string
  imageMobile?: string
  order: number
}

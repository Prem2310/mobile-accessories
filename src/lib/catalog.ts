import { banners, categories, offers, products, reviews, siteSettings } from './catalogStore'
import type { Banner, Category, Offer, Product, Review, SiteSettings } from './types'

/**
 * Data-access seam: every storefront/admin surface reads the catalog through these functions,
 * never straight from `catalogStore`. Admin writes call loadCatalog() to refresh the cache.
 */

export function getSiteSettings(): SiteSettings {
  return siteSettings
}

export function getCategories(): Category[] {
  return [...categories].filter((c) => c.enabled).sort((a, b) => a.order - b.order)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryProductCount(categoryId: string): number {
  return products.filter((p) => p.categoryId === categoryId).length
}

export interface ProductFilter {
  categorySlug?: string
  query?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStockOnly?: boolean
  discountedOnly?: boolean
  brands?: string[]
  compatibility?: string[]
  sort?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestselling' | 'discount'
}

export function getProducts(filter: ProductFilter = {}): Product[] {
  let list = [...products]

  if (filter.categorySlug) {
    const cat = getCategoryBySlug(filter.categorySlug)
    if (cat) list = list.filter((p) => p.categoryId === cat.id)
  }
  if (filter.query) {
    const q = filter.query.toLowerCase()
    list = list.filter((p) => p.title.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q))
  }
  if (filter.minPrice != null) list = list.filter((p) => p.price >= filter.minPrice!)
  if (filter.maxPrice != null) list = list.filter((p) => p.price <= filter.maxPrice!)
  if (filter.minRating != null) list = list.filter((p) => (p.rating ?? 0) >= filter.minRating!)
  if (filter.inStockOnly) list = list.filter((p) => p.stock > 0)
  if (filter.discountedOnly) list = list.filter((p) => p.mrp && p.mrp > p.price)
  if (filter.brands?.length) list = list.filter((p) => p.brand && filter.brands!.includes(p.brand))
  if (filter.compatibility?.length) list = list.filter((p) => filter.compatibility!.some((m) => p.compatibility?.includes(m)))

  switch (filter.sort) {
    case 'newest':
      list = list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival))
      break
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      break
    case 'bestselling':
      list = list.filter((p) => p.bestseller).concat(list.filter((p) => !p.bestseller))
      break
    case 'discount':
      list.sort((a, b) => discountPct(b) - discountPct(a))
      break
    case 'featured':
    default:
      list = list.filter((p) => p.featured).concat(list.filter((p) => !p.featured))
  }
  return list
}

function discountPct(p: Product) {
  return p.mrp && p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit)
}

export function getBestsellers(limit = 8): Product[] {
  return products.filter((p) => p.bestseller).slice(0, limit)
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.newArrival).slice(0, limit)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, limit)
}

export function getBrands(): string[] {
  return Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)))).sort()
}

/** Distinct compatibility values across all products — e.g. "iPhone 15", "Samsung S24" — used as filter facets and as autocomplete suggestions in the admin product editor. */
export function getCompatibilityOptions(): string[] {
  return Array.from(new Set(products.flatMap((p) => p.compatibility ?? []))).sort()
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId && r.approved)
}

export function getApprovedReviews(): Review[] {
  return reviews.filter((r) => r.approved)
}

export function getActiveOffers(): Offer[] {
  return offers.filter((o) => o.active)
}

export function getHeroBanners(): Banner[] {
  return [...banners].sort((a, b) => a.order - b.order)
}

import { supabase } from './supabase'
import type { Banner, Category, Offer, Product, ProductVariant, Review, SiteSettings } from './types'

/**
 * In-memory cache populated once from Supabase at app boot (see loadCatalog()).
 * catalog.ts reads synchronously from these arrays so every consuming component
 * keeps its simple synchronous API — no useEffect/loading-state plumbing per page.
 * Admin writes call loadCatalog() again afterwards to refresh the cache.
 */
export let categories: Category[] = []
export let products: Product[] = []
export let offers: Offer[] = []
export let banners: Banner[] = []
export let reviews: Review[] = []
export let siteSettings: SiteSettings = {
  storeName: 'Raghav Mobile Accessories',
  area: '',
  hours: '',
  whatsappNumber: '',
  instagramHandle: '',
  whatsappOrderTemplate: '',
  whatsappEnquiryTemplate: '',
  freeDeliveryThreshold: 0,
}

function mapCategory(row: {
  id: string; slug: string; name: string; description: string | null; image_url: string | null
  icon: string | null; parent_id: string | null; sort_order: number; enabled: boolean
}): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? undefined,
    image: row.image_url ?? undefined,
    icon: (row.icon as Category['icon']) ?? undefined,
    parentId: row.parent_id,
    order: row.sort_order,
    enabled: row.enabled,
  }
}

function mapVariant(row: { id: string; sku: string; attributes: unknown; price: number; mrp: number | null; stock: number }): ProductVariant {
  return {
    id: row.id,
    sku: row.sku,
    attributes: (row.attributes as Record<string, string>) ?? {},
    price: Number(row.price),
    mrp: row.mrp != null ? Number(row.mrp) : undefined,
    stock: row.stock,
  }
}

interface ProductRow {
  id: string; slug: string; title: string; short_description: string | null; description: string | null
  category_id: string | null; brand: string | null; compatibility: string[]; price: number; mrp: number | null
  rating: number | null; review_count: number; stock: number; featured: boolean; bestseller: boolean
  new_arrival: boolean; variant_label: string | null; specifications: unknown; warranty: string | null
  delivery_info: string | null; tags: string[]
  product_variants?: Parameters<typeof mapVariant>[0][]
  product_images?: { public_url: string; position: number }[]
}

function mapProduct(row: ProductRow): Product {
  const images = (row.product_images ?? []).slice().sort((a, b) => a.position - b.position).map((i) => i.public_url)
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description ?? undefined,
    description: row.description ?? undefined,
    categoryId: row.category_id ?? '',
    brand: row.brand ?? undefined,
    compatibility: row.compatibility,
    images,
    price: Number(row.price),
    mrp: row.mrp != null ? Number(row.mrp) : undefined,
    rating: row.rating != null ? Number(row.rating) : undefined,
    reviewCount: row.review_count,
    stock: row.stock,
    featured: row.featured,
    bestseller: row.bestseller,
    newArrival: row.new_arrival,
    variantLabel: row.variant_label ?? undefined,
    variants: row.product_variants?.length ? row.product_variants.map(mapVariant) : undefined,
    specifications: (row.specifications as Product['specifications']) ?? undefined,
    warranty: row.warranty ?? undefined,
    deliveryInfo: row.delivery_info ?? undefined,
    tags: row.tags,
  }
}

function mapOffer(row: { id: string; title: string; subtitle: string | null; tone: string; cta_label: string | null; cta_href: string | null; starts_at: string | null; ends_at: string | null; active: boolean }): Offer {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    tone: row.tone as Offer['tone'],
    ctaLabel: row.cta_label ?? undefined,
    ctaHref: row.cta_href ?? undefined,
    startsAt: row.starts_at ?? undefined,
    endsAt: row.ends_at ?? undefined,
    active: row.active,
  }
}

function mapBanner(row: {
  id: string; title: string; description: string | null; cta_label: string | null; cta_href: string | null
  image_desktop_url: string | null; image_mobile_url: string | null; sort_order: number
}): Banner {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    ctaLabel: row.cta_label ?? undefined,
    ctaHref: row.cta_href ?? undefined,
    imageDesktop: row.image_desktop_url ?? undefined,
    imageMobile: row.image_mobile_url ?? undefined,
    order: row.sort_order,
  }
}

function mapReview(row: { id: string; product_id: string; author: string; rating: number; comment: string | null; verified: boolean; created_at: string; approved: boolean }): Review {
  return {
    id: row.id,
    productId: row.product_id,
    author: row.author,
    rating: row.rating,
    comment: row.comment ?? '',
    verified: row.verified,
    createdAt: row.created_at,
    approved: row.approved,
  }
}

function mapSettings(row: {
  store_name: string; area: string; hours: string; whatsapp_number: string; instagram_handle: string
  gst_number: string | null; whatsapp_order_template: string; whatsapp_enquiry_template: string; free_delivery_threshold: number
  hero_eyebrow: string; hero_headline: string; hero_subheadline: string
}): SiteSettings {
  return {
    storeName: row.store_name,
    area: row.area,
    hours: row.hours,
    whatsappNumber: row.whatsapp_number,
    instagramHandle: row.instagram_handle,
    gstNumber: row.gst_number ?? undefined,
    whatsappOrderTemplate: row.whatsapp_order_template,
    whatsappEnquiryTemplate: row.whatsapp_enquiry_template,
    freeDeliveryThreshold: Number(row.free_delivery_threshold),
    heroEyebrow: row.hero_eyebrow || undefined,
    heroHeadline: row.hero_headline || undefined,
    heroSubheadline: row.hero_subheadline || undefined,
  }
}

let loaded = false

export async function loadCatalog(): Promise<void> {
  const [categoriesRes, productsRes, offersRes, bannersRes, reviewsRes, settingsRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('products').select('*, product_variants(*), product_images(public_url, position)'),
    supabase.from('offers').select('*').order('sort_order'),
    supabase.from('banners').select('*').eq('enabled', true).order('sort_order'),
    supabase.from('reviews').select('*').eq('approved', true),
    supabase.from('site_settings').select('*').single(),
  ])

  if (categoriesRes.error) throw categoriesRes.error
  if (productsRes.error) throw productsRes.error
  if (offersRes.error) throw offersRes.error
  if (bannersRes.error) throw bannersRes.error
  if (reviewsRes.error) throw reviewsRes.error
  if (settingsRes.error) throw settingsRes.error

  categories = categoriesRes.data.map(mapCategory)
  products = productsRes.data.map((row) => mapProduct(row as ProductRow))
  offers = offersRes.data.map(mapOffer)
  banners = bannersRes.data.map(mapBanner)
  reviews = reviewsRes.data.map(mapReview)
  siteSettings = mapSettings(settingsRes.data)
  loaded = true
}

export function isCatalogLoaded(): boolean {
  return loaded
}

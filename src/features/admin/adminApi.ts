import { supabase } from '../../lib/supabase'
import type { Database } from '../../lib/database.types'

type ProductRow = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type CategoryInsert = Database['public']['Tables']['categories']['Insert']
type BannerRow = Database['public']['Tables']['banners']['Row']
type OfferRow = Database['public']['Tables']['offers']['Row']
type SiteSettingsRow = Database['public']['Tables']['site_settings']['Row']

export async function adminListProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name), product_variants(count), product_images(public_url, position)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as (ProductRow & {
    categories: { name: string } | null
    product_variants: { count: number }[]
    product_images: { public_url: string; position: number }[]
  })[]
}

export async function adminCreateProduct(input: ProductInsert) {
  const { error } = await supabase.from('products').insert(input)
  if (error) throw error
}

export async function adminUpdateProduct(id: string, patch: Partial<ProductInsert>) {
  const { error } = await supabase.from('products').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
}

export async function adminDeleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function adminUploadProductImage(productId: string, file: File) {
  const path = `${productId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file)
  if (uploadError) throw uploadError
  const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(path)
  const { error } = await supabase.from('product_images').insert({
    product_id: productId,
    storage_path: path,
    public_url: publicUrl.publicUrl,
    position: 0,
  })
  if (error) throw error
}

export async function adminAdjustStock(productId: string, delta: number, reason: string) {
  const { data: product, error: readError } = await supabase.from('products').select('stock').eq('id', productId).single()
  if (readError) throw readError
  const { error } = await supabase.from('products').update({ stock: product.stock + delta }).eq('id', productId)
  if (error) throw error
  const { data: auth } = await supabase.auth.getUser()
  await supabase.from('inventory_movements').insert({ product_id: productId, change: delta, reason, created_by: auth.user?.id })
}

export async function adminListCategories() {
  const { data, error } = await supabase.from('categories').select('*').order('sort_order')
  if (error) throw error
  return data as CategoryRow[]
}

export async function adminCreateCategory(input: CategoryInsert) {
  const { error } = await supabase.from('categories').insert(input)
  if (error) throw error
}

export async function adminUpdateCategory(id: string, patch: Partial<CategoryInsert>) {
  const { error } = await supabase.from('categories').update(patch).eq('id', id)
  if (error) throw error
}

export async function adminDeleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

export async function adminListBanners() {
  const { data, error } = await supabase.from('banners').select('*').order('sort_order')
  if (error) throw error
  return data as BannerRow[]
}

export async function adminCreateBanner(input: Database['public']['Tables']['banners']['Insert']) {
  const { error } = await supabase.from('banners').insert(input)
  if (error) throw error
}

export async function adminUpdateBanner(id: string, patch: Partial<Database['public']['Tables']['banners']['Insert']>) {
  const { error } = await supabase.from('banners').update(patch).eq('id', id)
  if (error) throw error
}

export async function adminDeleteBanner(id: string) {
  const { error } = await supabase.from('banners').delete().eq('id', id)
  if (error) throw error
}

export async function adminListOffers() {
  const { data, error } = await supabase.from('offers').select('*').order('sort_order')
  if (error) throw error
  return data as OfferRow[]
}

export async function adminCreateOffer(input: Database['public']['Tables']['offers']['Insert']) {
  const { error } = await supabase.from('offers').insert(input)
  if (error) throw error
}

export async function adminUpdateOffer(id: string, patch: Partial<Database['public']['Tables']['offers']['Insert']>) {
  const { error } = await supabase.from('offers').update(patch).eq('id', id)
  if (error) throw error
}

export async function adminDeleteOffer(id: string) {
  const { error } = await supabase.from('offers').delete().eq('id', id)
  if (error) throw error
}

export async function adminGetSettings() {
  const { data, error } = await supabase.from('site_settings').select('*').single()
  if (error) throw error
  return data as SiteSettingsRow
}

export async function adminUpdateSettings(patch: Partial<Database['public']['Tables']['site_settings']['Update']>) {
  const { error } = await supabase.from('site_settings').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', true)
  if (error) throw error
}

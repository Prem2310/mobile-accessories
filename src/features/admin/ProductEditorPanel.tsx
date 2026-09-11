import { useEffect, useState } from 'react'
import { Button } from '../../components/ds/Button'
import { Checkbox } from '../../components/ds/Checkbox'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { Select } from '../../components/ds/Select'
import { getCompatibilityOptions } from '../../lib/catalog'
import type { Database } from '../../lib/database.types'
import {
  adminCreateVariant,
  adminDeleteProductImage,
  adminDeleteVariant,
  adminGetProduct,
  adminSetImagePosition,
  adminUpdateProduct,
  adminUpdateVariant,
  adminUploadProductImages,
} from './adminApi'

type CategoryRow = Database['public']['Tables']['categories']['Row']
type ProductRow = Database['public']['Tables']['products']['Row']
type VariantRow = Database['public']['Tables']['product_variants']['Row']
type ImageRow = Database['public']['Tables']['product_images']['Row']
type Spec = { label: string; value: string }

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 80,
  padding: '10px var(--sp-4)',
  borderRadius: 'var(--radius-md)',
  border: '1.5px solid var(--border-default)',
  font: 'var(--type-body)',
  color: 'var(--text-strong)',
  resize: 'vertical',
}

const labelStyle: React.CSSProperties = { display: 'block', font: 'var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }
const section: React.CSSProperties = { display: 'grid', gap: 'var(--sp-3)', paddingBottom: 'var(--sp-6)', marginBottom: 'var(--sp-6)', borderBottom: '1px solid var(--border-subtle)' }
const sectionTitle: React.CSSProperties = { font: 'var(--fw-bold) var(--fs-md)/1 var(--font-body)', color: 'var(--text-strong)' }

export function ProductEditorPanel({
  productId,
  categories,
  onClose,
  onSaved,
}: {
  productId: string
  categories: CategoryRow[]
  onClose: () => void
  onSaved: () => void
}) {
  const [product, setProduct] = useState<ProductRow | null>(null)
  const [variants, setVariants] = useState<VariantRow[]>([])
  const [images, setImages] = useState<ImageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Two refresh helpers on purpose: variants/images autosave immediately (upload, delete,
  // reorder, blur), and re-fetching the whole product row after each of those would clobber
  // any not-yet-saved edits sitting in the Basic/Pricing/Flags fields below. Those fields only
  // get written back to `product` state on initial load and after the explicit "Save changes".
  const refreshVariantsAndImages = async () => {
    const row = await adminGetProduct(productId)
    setVariants(row.product_variants.slice().sort((a, b) => a.created_at.localeCompare(b.created_at)))
    setImages(row.product_images.slice().sort((a, b) => a.position - b.position))
  }

  const refreshAll = async () => {
    const row = await adminGetProduct(productId)
    const { product_variants, product_images, ...p } = row
    setProduct(p as ProductRow)
    setVariants(product_variants.slice().sort((a, b) => a.created_at.localeCompare(b.created_at)))
    setImages(product_images.slice().sort((a, b) => a.position - b.position))
  }

  useEffect(() => {
    setLoading(true)
    refreshAll().finally(() => setLoading(false))
  }, [productId])

  const set = <K extends keyof ProductRow>(key: K, value: ProductRow[K]) => setProduct((p) => (p ? { ...p, [key]: value } : p))

  const save = async () => {
    if (!product) return
    setSaving(true)
    setError(null)
    try {
      await adminUpdateProduct(product.id, {
        title: product.title,
        category_id: product.category_id,
        brand: product.brand,
        short_description: product.short_description,
        description: product.description,
        price: product.price,
        mrp: product.mrp,
        stock: product.stock,
        published: product.published,
        featured: product.featured,
        bestseller: product.bestseller,
        new_arrival: product.new_arrival,
        variant_label: product.variant_label,
        warranty: product.warranty,
        delivery_info: product.delivery_info,
        compatibility: product.compatibility,
        tags: product.tags,
        specifications: product.specifications,
        seo_title: product.seo_title,
        seo_description: product.seo_description,
      })
      await refreshAll()
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save')
    } finally {
      setSaving(false)
    }
  }

  const specs = (product?.specifications as Spec[] | null) ?? []
  const setSpecs = (next: Spec[]) => set('specifications', next as unknown as ProductRow['specifications'])

  const uploadFiles = async (files: FileList | null) => {
    if (!files || !files.length || !product) return
    await adminUploadProductImages(product.id, Array.from(files), images.length)
    await refreshVariantsAndImages()
    onSaved()
  }

  const removeImage = async (img: ImageRow) => {
    await adminDeleteProductImage(img)
    await refreshVariantsAndImages()
    onSaved()
  }

  const moveImage = async (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= images.length) return
    const a = images[index]
    const b = images[target]
    await Promise.all([adminSetImagePosition(a.id, b.position), adminSetImagePosition(b.id, a.position)])
    await refreshVariantsAndImages()
  }

  const addVariant = async () => {
    if (!product) return
    const n = variants.length + 1
    await adminCreateVariant({
      product_id: product.id,
      sku: `${product.slug}-${n}`,
      attributes: { [product.variant_label || 'Variant']: '' },
      price: product.price,
      mrp: product.mrp,
      stock: 0,
    })
    await refreshVariantsAndImages()
    onSaved()
  }

  const updateVariant = async (v: VariantRow, patch: Partial<VariantRow>) => {
    await adminUpdateVariant(v.id, patch)
    await refreshVariantsAndImages()
    onSaved()
  }

  const removeVariant = async (id: string) => {
    if (!confirm('Delete this variant?')) return
    await adminDeleteVariant(id)
    await refreshVariantsAndImages()
    onSaved()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)' }} />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          height: '100%',
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--sp-5) var(--sp-6)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ font: 'var(--fw-bold) var(--fs-lg)/1 var(--font-body)', color: 'var(--text-strong)' }}>Edit product</div>
          <button onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer' }} aria-label="Close">
            <Icon name="x" size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 'var(--sp-6)' }}>
          {loading || !product ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
          ) : (
            <>
              <div style={section}>
                <div style={sectionTitle}>Basic</div>
                <Input label="Title" value={product.title} onChange={(e) => set('title', e.target.value)} />
                <Input label="Slug" value={product.slug} disabled hint="Slugs are permanent — links and carts reference them." />
                <Select
                  label="Category"
                  options={categories.map((c) => ({ value: c.id, label: c.name }))}
                  value={product.category_id ?? ''}
                  onChange={(e) => set('category_id', e.target.value || null)}
                />
                <Input label="Brand" value={product.brand ?? ''} onChange={(e) => set('brand', e.target.value || null)} />
                <Input
                  label="Compatibility (comma-separated)"
                  hint="Reuse existing values (e.g. “iPhone 15”) so the storefront filter groups them together."
                  list="compatibility-options"
                  value={(product.compatibility ?? []).join(', ')}
                  onChange={(e) => set('compatibility', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                />
                <datalist id="compatibility-options">
                  {getCompatibilityOptions().map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
                <label>
                  <span style={labelStyle}>Short description</span>
                  <Input value={product.short_description ?? ''} onChange={(e) => set('short_description', e.target.value || null)} />
                </label>
                <label>
                  <span style={labelStyle}>Full description</span>
                  <textarea style={textareaStyle} value={product.description ?? ''} onChange={(e) => set('description', e.target.value || null)} />
                </label>
              </div>

              <div style={section}>
                <div style={sectionTitle}>Pricing &amp; stock</div>
                {variants.length > 0 ? (
                  <p style={{ color: 'var(--text-muted)', font: 'var(--fs-sm)/1.4 var(--font-body)' }}>
                    This product has variants — price, MRP and stock are set per variant below.
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 'var(--sp-3)' }}>
                    <Input label="Price (₹)" type="number" value={product.price} onChange={(e) => set('price', Number(e.target.value))} />
                    <Input label="MRP (₹)" type="number" value={product.mrp ?? ''} onChange={(e) => set('mrp', e.target.value ? Number(e.target.value) : null)} />
                    <Input label="Stock" type="number" value={product.stock} onChange={(e) => set('stock', Number(e.target.value))} />
                  </div>
                )}
              </div>

              <div style={section}>
                <div style={sectionTitle}>Visibility</div>
                <Checkbox label="Published (visible on storefront)" checked={product.published} onChange={(e) => set('published', e.target.checked)} />
                <Checkbox label="Featured on homepage" checked={product.featured} onChange={(e) => set('featured', e.target.checked)} />
                <Checkbox label="Bestseller" checked={product.bestseller} onChange={(e) => set('bestseller', e.target.checked)} />
                <Checkbox label="New arrival" checked={product.new_arrival} onChange={(e) => set('new_arrival', e.target.checked)} />
              </div>

              <div style={section}>
                <div style={sectionTitle}>Photos</div>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                  {images.map((img, i) => (
                    <div key={img.id} style={{ position: 'relative', width: 88, height: 88 }}>
                      <img src={img.public_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }} />
                      <button
                        onClick={() => removeImage(img)}
                        style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', border: 'none', background: 'var(--red-600)', color: '#fff', cursor: 'pointer', font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)' }}
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                      <div style={{ position: 'absolute', bottom: -6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <button onClick={() => moveImage(i, -1)} disabled={i === 0} style={{ border: 0, background: 'var(--white)', borderRadius: 4, cursor: i === 0 ? 'default' : 'pointer', opacity: i === 0 ? 0.3 : 1 }} aria-label="Move earlier">
                          <Icon name="chevron-left" size={14} />
                        </button>
                        <button onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} style={{ border: 0, background: 'var(--white)', borderRadius: 4, cursor: i === images.length - 1 ? 'default' : 'pointer', opacity: i === images.length - 1 ? 0.3 : 1 }} aria-label="Move later">
                          <Icon name="chevron-right" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <label style={{ width: 88, height: 88, display: 'grid', placeItems: 'center', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-faint)' }}>
                    <Icon name="plus" size={20} />
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => { uploadFiles(e.target.files); e.target.value = '' }} />
                  </label>
                </div>
              </div>

              <div style={section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={sectionTitle}>Variants</div>
                  <Button variant="ghost" onClick={addVariant} iconLeft={<Icon name="plus" size={14} />}>
                    Add variant
                  </Button>
                </div>
                {variants.length > 0 && (
                  <Input label="Variant label (e.g. Model, Size, Color)" value={product.variant_label ?? ''} onChange={(e) => set('variant_label', e.target.value || null)} />
                )}
                {variants.length === 0 && <p style={{ color: 'var(--text-muted)', font: 'var(--fs-sm)/1.4 var(--font-body)' }}>No variants — this product sells at a single price/stock level.</p>}
                {variants.map((v) => {
                  const attrs = (v.attributes as Record<string, string>) ?? {}
                  const value = attrs[product.variant_label || 'Variant'] ?? Object.values(attrs)[0] ?? ''
                  return (
                    <div key={v.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr)) auto', gap: 'var(--sp-2)', alignItems: 'end' }}>
                      <Input
                        label="Value"
                        defaultValue={value}
                        onBlur={(e) => updateVariant(v, { attributes: { [product.variant_label || 'Variant']: e.target.value } })}
                      />
                      <Input label="Price" type="number" defaultValue={v.price} onBlur={(e) => updateVariant(v, { price: Number(e.target.value) })} />
                      <Input label="MRP" type="number" defaultValue={v.mrp ?? ''} onBlur={(e) => updateVariant(v, { mrp: e.target.value ? Number(e.target.value) : null })} />
                      <Input label="Stock" type="number" defaultValue={v.stock} onBlur={(e) => updateVariant(v, { stock: Number(e.target.value) })} />
                      <button onClick={() => removeVariant(v.id)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer', height: 'var(--control-md)' }} aria-label="Delete variant">
                        <Icon name="trash-2" size={16} />
                      </button>
                    </div>
                  )
                })}
              </div>

              <div style={section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={sectionTitle}>Specifications</div>
                  <Button variant="ghost" onClick={() => setSpecs([...specs, { label: '', value: '' }])} iconLeft={<Icon name="plus" size={14} />}>
                    Add row
                  </Button>
                </div>
                {specs.map((s, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 'var(--sp-2)' }}>
                    <Input placeholder="Label" value={s.label} onChange={(e) => setSpecs(specs.map((sp, si) => (si === i ? { ...sp, label: e.target.value } : sp)))} />
                    <Input placeholder="Value" value={s.value} onChange={(e) => setSpecs(specs.map((sp, si) => (si === i ? { ...sp, value: e.target.value } : sp)))} />
                    <button onClick={() => setSpecs(specs.filter((_, si) => si !== i))} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Remove spec">
                      <Icon name="trash-2" size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={section}>
                <div style={sectionTitle}>Extra</div>
                <Input label="Warranty" value={product.warranty ?? ''} onChange={(e) => set('warranty', e.target.value || null)} />
                <Input label="Delivery info" value={product.delivery_info ?? ''} onChange={(e) => set('delivery_info', e.target.value || null)} />
                <Input label="Tags (comma-separated)" value={(product.tags ?? []).join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                <Input label="SEO title" value={product.seo_title ?? ''} onChange={(e) => set('seo_title', e.target.value || null)} />
                <label>
                  <span style={labelStyle}>SEO description</span>
                  <textarea style={textareaStyle} value={product.seo_description ?? ''} onChange={(e) => set('seo_description', e.target.value || null)} />
                </label>
              </div>

              {error && <p style={{ color: 'var(--red-600)' }}>{error}</p>}
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 'var(--sp-3)', padding: 'var(--sp-5) var(--sp-6)', borderTop: '1px solid var(--border-subtle)' }}>
          <Button onClick={save} disabled={saving || loading} fullWidth>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

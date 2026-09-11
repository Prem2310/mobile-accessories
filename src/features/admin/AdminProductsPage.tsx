import { useEffect, useState } from 'react'
import { Badge } from '../../components/ds/Badge'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { Select } from '../../components/ds/Select'
import { loadCatalog } from '../../lib/catalogStore'
import { adminCreateProduct, adminDeleteProduct, adminListCategories, adminListProducts, adminUpdateProduct } from './adminApi'
import { ProductEditorPanel } from './ProductEditorPanel'
import type { Database } from '../../lib/database.types'

type Product = Awaited<ReturnType<typeof adminListProducts>>[number]
type Category = Database['public']['Tables']['categories']['Row']

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stockFilter, setStockFilter] = useState<'all' | 'out' | 'low'>('all')
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'live' | 'hidden'>('all')

  const refresh = async () => {
    setLoading(true)
    const [p, c] = await Promise.all([adminListProducts(), adminListCategories()])
    setProducts(p)
    setCategories(c)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const updateField = async (id: string, patch: Partial<Product>) => {
    setSavingId(id)
    await adminUpdateProduct(id, patch)
    await refresh()
    await loadCatalog()
    setSavingId(null)
  }

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return
    await adminDeleteProduct(id)
    await refresh()
    await loadCatalog()
  }

  const filteredProducts = products.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.slug.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter && p.category_id !== categoryFilter) return false
    if (stockFilter === 'out' && p.stock > 0) return false
    if (stockFilter === 'low' && !(p.stock > 0 && p.stock <= 5)) return false
    if (publishedFilter === 'live' && !p.published) return false
    if (publishedFilter === 'hidden' && p.published) return false
    return true
  })

  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>Edit price, stock and visibility inline. Changes reflect on the storefront immediately.</p>
        </div>
        <Button onClick={() => setShowForm(true)} iconLeft={<Icon name="plus" size={16} />}>
          Add product
        </Button>
      </div>

      {showForm && (
        <NewProductForm
          categories={categories}
          onClose={() => setShowForm(false)}
          onCreated={async () => {
            setShowForm(false)
            await refresh()
            await loadCatalog()
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', alignItems: 'center' }}>
        <Input placeholder="Search by title or slug…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 220 }} />
        <Select
          options={[{ value: '', label: 'All categories' }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <Select
          options={[
            { value: 'all', label: 'All stock' },
            { value: 'low', label: 'Low stock (≤5)' },
            { value: 'out', label: 'Out of stock' },
          ]}
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
        />
        <Select
          options={[
            { value: 'all', label: 'All visibility' },
            { value: 'live', label: 'Live only' },
            { value: 'hidden', label: 'Hidden only' },
          ]}
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value as typeof publishedFilter)}
        />
        <span style={{ color: 'var(--text-faint)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)' }}>
          {filteredProducts.length} of {products.length}
        </span>
      </div>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--fw-medium) var(--fs-sm)/1.3 var(--font-body)' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={th}>Photo</th>
              <th style={th}>Product</th>
              <th style={th}>Category</th>
              <th style={th}>Price</th>
              <th style={th}>MRP</th>
              <th style={th}>Stock</th>
              <th style={th}>Published</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td style={td} colSpan={8}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && filteredProducts.length === 0 && (
              <tr>
                <td style={td} colSpan={8}>
                  {products.length === 0 ? 'No products yet — add your first one.' : 'No products match these filters.'}
                </td>
              </tr>
            )}
            {filteredProducts.map((p) => {
              const variantCount = p.product_variants?.[0]?.count ?? 0
              const hasVariants = variantCount > 0
              return (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)', opacity: savingId === p.id ? 0.5 : 1 }}>
                <td style={td}>
                  <button onClick={() => setEditingId(p.id)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }} aria-label="Edit product">
                    <PhotoCell product={p} />
                  </button>
                </td>
                <td style={td}>
                  <button onClick={() => setEditingId(p.id)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)', color: 'var(--text-strong)' }}>{p.title}</div>
                    <div style={{ color: 'var(--text-faint)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)' }}>{p.slug}</div>
                  </button>
                </td>
                <td style={td}>{p.categories?.name ?? '—'}</td>
                <td style={td}>
                  {hasVariants ? (
                    <button onClick={() => setEditingId(p.id)} style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', color: 'var(--orange-600)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)' }}>
                      Edit variants ({variantCount})
                    </button>
                  ) : (
                    <InlineNumber value={p.price} onCommit={(v) => updateField(p.id, { price: v })} prefix="₹" />
                  )}
                </td>
                <td style={td}>
                  {hasVariants ? (
                    <span style={{ color: 'var(--text-faint)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)' }}>—</span>
                  ) : (
                    <InlineNumber value={p.mrp ?? 0} onCommit={(v) => updateField(p.id, { mrp: v || null })} prefix="₹" />
                  )}
                </td>
                <td style={td}>
                  <InlineNumber value={p.stock} onCommit={(v) => updateField(p.id, { stock: v })} />
                </td>
                <td style={td}>
                  <button
                    onClick={() => updateField(p.id, { published: !p.published })}
                    style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Badge tone={p.published ? 'stock' : 'info'}>{p.published ? 'Live' : 'Hidden'}</Badge>
                  </button>
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                    <button onClick={() => setEditingId(p.id)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Edit">
                      <Icon name="pencil" size={16} />
                    </button>
                    <button onClick={() => remove(p.id, p.title)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Delete">
                      <Icon name="trash-2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {editingId && (
        <ProductEditorPanel
          productId={editingId}
          categories={categories}
          onClose={() => setEditingId(null)}
          onSaved={async () => {
            await refresh()
            await loadCatalog()
          }}
        />
      )}
    </div>
  )
}

const th: React.CSSProperties = { padding: '10px 16px' }
const td: React.CSSProperties = { padding: '10px 16px' }

function PhotoCell({ product }: { product: Product }) {
  const url = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position)[0]?.public_url
  return (
    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-default)', background: 'var(--gray-100)', flexShrink: 0 }}>
      {url ? (
        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: 'var(--text-faint)', fontSize: 10 }}>Add</span>
      )}
    </div>
  )
}

function InlineNumber({ value, onCommit, prefix }: { value: number; onCommit: (v: number) => void; prefix?: string }) {
  const [v, setV] = useState(String(value))
  useEffect(() => setV(String(value)), [value])
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {prefix && <span style={{ color: 'var(--text-faint)' }}>{prefix}</span>}
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => {
          const n = Number(v)
          if (!Number.isNaN(n) && n !== value) onCommit(n)
          else setV(String(value))
        }}
        style={{ width: 76, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '6px 8px', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-mono)' }}
      />
    </span>
  )
}

function NewProductForm({ categories, onClose, onCreated }: { categories: Category[]; onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [price, setPrice] = useState('')
  const [mrp, setMrp] = useState('')
  const [stock, setStock] = useState('0')
  const [shortDescription, setShortDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !price) {
      setError('Title and price are required.')
      return
    }
    setBusy(true)
    try {
      await adminCreateProduct({
        title: title.trim(),
        slug: slugify(title),
        category_id: categoryId || null,
        price: Number(price),
        mrp: mrp ? Number(mrp) : null,
        stock: Number(stock) || 0,
        short_description: shortDescription || null,
      })
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create product')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-6)', display: 'grid', gap: 'var(--sp-4)', maxWidth: 480 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-lg)/1 var(--font-body)', color: 'var(--text-strong)' }}>Add product</div>
        <button type="button" onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}>
          <Icon name="x" size={18} />
        </button>
      </div>
      <Input label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Matte Silicone Case" />
      <Select label="Category" options={categories.map((c) => ({ value: c.id, label: c.name }))} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--sp-3)' }}>
        <Input label="Price (₹)" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input label="MRP (₹)" type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} />
        <Input label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <Input label="Short description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
      {error && <p style={{ color: 'var(--red-600)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)' }}>{error}</p>}
      <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Create product'}
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { Badge } from '../../components/ds/Badge'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { Select } from '../../components/ds/Select'
import { loadCatalog } from '../../lib/catalogStore'
import { adminCreateReview, adminListProducts, adminListReviews, adminSetReviewApproved } from './adminApi'

type Review = Awaited<ReturnType<typeof adminListReviews>>[number]
type ProductOption = { id: string; title: string }

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<ProductOption[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const refresh = async () => {
    setLoading(true)
    const [r, { data: p }] = await Promise.all([adminListReviews(), adminListProducts(1, 500)])
    setReviews(r)
    setProducts(p.map((x) => ({ id: x.id, title: x.title })))
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const toggleApproved = async (id: string, approved: boolean) => {
    await adminSetReviewApproved(id, !approved)
    await refresh()
    await loadCatalog()
  }

  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Reviews</h1>
          <p style={{ color: 'var(--text-muted)' }}>Approve customer reviews to show them on the storefront, or seed one manually.</p>
        </div>
        <Button onClick={() => setShowForm(true)} iconLeft={<Icon name="plus" size={16} />}>
          Add review
        </Button>
      </div>

      {showForm && (
        <NewReviewForm
          products={products}
          onClose={() => setShowForm(false)}
          onCreated={async () => {
            setShowForm(false)
            await refresh()
            await loadCatalog()
          }}
        />
      )}

      <div style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', font: 'var(--fw-medium) var(--fs-sm)/1.3 var(--font-body)' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={th}>Product</th>
              <th style={th}>Author</th>
              <th style={th}>Rating</th>
              <th style={th}>Comment</th>
              <th style={th}>Status</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td style={td} colSpan={6}>
                  Loading…
                </td>
              </tr>
            )}
            {!loading && reviews.length === 0 && (
              <tr>
                <td style={td} colSpan={6}>
                  No reviews yet.
                </td>
              </tr>
            )}
            {reviews.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={td}>{r.products?.title ?? '—'}</td>
                <td style={td}>{r.author}</td>
                <td style={td}>{r.rating.toFixed(1)}★</td>
                <td style={{ ...td, maxWidth: 320 }}>{r.comment}</td>
                <td style={td}>
                  <Badge tone={r.approved ? 'stock' : 'info'}>{r.approved ? 'Approved' : 'Pending'}</Badge>
                </td>
                <td style={td}>
                  <Button size="sm" variant="outline" onClick={() => toggleApproved(r.id, r.approved)}>
                    {r.approved ? 'Unapprove' : 'Approve'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th: React.CSSProperties = { padding: '10px 16px' }
const td: React.CSSProperties = { padding: '10px 16px' }

function NewReviewForm({ products, onClose, onCreated }: { products: ProductOption[]; onClose: () => void; onCreated: () => void }) {
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState('5')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!productId || !author.trim()) {
      setError('Product and author are required.')
      return
    }
    setSaving(true)
    try {
      await adminCreateReview({ product_id: productId, author: author.trim(), rating: Number(rating), comment: comment.trim() || null, approved: true })
      onCreated()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save the review.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)', display: 'grid', gap: 'var(--sp-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>Add a review</h2>
        <button onClick={onClose} aria-label="Close" style={{ border: 0, background: 'none', cursor: 'pointer', padding: 4 }}>
          <Icon name="x" size={18} />
        </button>
      </div>
      <Select label="Product" options={products.map((p) => ({ value: p.id, label: p.title }))} value={productId} onChange={(e) => setProductId(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--sp-3)' }}>
        <Input label="Author" required value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Customer name" />
        <Input label="Rating (1-5)" type="number" min={1} max={5} step={0.5} value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <Input label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What they said" />
      {error && <p style={{ color: 'var(--red-600)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)' }}>{error}</p>}
      <Button onClick={submit} disabled={saving}>
        {saving ? 'Saving…' : 'Save review'}
      </Button>
    </div>
  )
}

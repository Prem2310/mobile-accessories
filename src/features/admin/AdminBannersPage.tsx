import { useEffect, useState } from 'react'
import { Badge } from '../../components/ds/Badge'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { Select } from '../../components/ds/Select'
import { loadCatalog } from '../../lib/catalogStore'
import { adminCreateOffer, adminDeleteOffer, adminListOffers, adminUpdateOffer } from './adminApi'
import type { Database } from '../../lib/database.types'

type Offer = Database['public']['Tables']['offers']['Row']

export function AdminBannersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [tone, setTone] = useState<'navy' | 'orange'>('navy')

  const refresh = async () => {
    setLoading(true)
    setOffers(await adminListOffers())
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await adminCreateOffer({ title: title.trim(), subtitle: subtitle || null, tone, sort_order: offers.length + 1 })
    setTitle('')
    setSubtitle('')
    await refresh()
    await loadCatalog()
  }

  const toggle = async (o: Offer) => {
    await adminUpdateOffer(o.id, { active: !o.active })
    await refresh()
    await loadCatalog()
  }

  const remove = async (o: Offer) => {
    if (!confirm(`Delete offer "${o.title}"?`)) return
    await adminDeleteOffer(o.id)
    await refresh()
    await loadCatalog()
  }

  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-5)', maxWidth: 640 }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Offers</h1>
        <p style={{ color: 'var(--text-muted)' }}>Shown on the homepage and /offers. Banner image uploads aren't wired yet — text offers only for now.</p>
      </div>

      <form onSubmit={add} style={{ display: 'grid', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Flat 20% off on TWS earbuds" />
        <Input label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="This week only" />
        <Select label="Tone" options={[{ value: 'navy', label: 'Navy' }, { value: 'orange', label: 'Orange' }]} value={tone} onChange={(e) => setTone(e.target.value as 'navy' | 'orange')} />
        <Button type="submit">Add offer</Button>
      </form>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        {loading && <div style={{ padding: 'var(--sp-5)', color: 'var(--text-muted)' }}>Loading…</div>}
        {!loading && offers.length === 0 && <div style={{ padding: 'var(--sp-5)', color: 'var(--text-muted)' }}>No offers yet.</div>}
        {offers.map((o, i) => (
          <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-4) var(--sp-5)', borderBottom: i < offers.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)', color: 'var(--text-strong)' }}>{o.title}</div>
              {o.subtitle && <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)', color: 'var(--text-muted)' }}>{o.subtitle}</div>}
            </div>
            <button onClick={() => toggle(o)} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0 }}>
              <Badge tone={o.active ? 'stock' : 'info'}>{o.active ? 'Active' : 'Off'}</Badge>
            </button>
            <button onClick={() => remove(o)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Delete">
              <Icon name="trash-2" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

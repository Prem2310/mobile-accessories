import { useEffect, useState } from 'react'
import { Badge } from '../../components/ds/Badge'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { Select } from '../../components/ds/Select'
import { loadCatalog } from '../../lib/catalogStore'
import {
  adminCreateBanner,
  adminCreateOffer,
  adminDeleteBanner,
  adminDeleteOffer,
  adminListBanners,
  adminListOffers,
  adminUpdateBanner,
  adminUpdateOffer,
  adminUploadBannerImage,
} from './adminApi'
import type { Database } from '../../lib/database.types'

type Offer = Database['public']['Tables']['offers']['Row']
type Banner = Database['public']['Tables']['banners']['Row']

export function AdminBannersPage() {
  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-10)', maxWidth: 720 }}>
      <HeroBanners />
      <OfferStrips />
    </div>
  )
}

function HeroBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [busy, setBusy] = useState(false)

  const refresh = async () => {
    setLoading(true)
    setBanners(await adminListBanners())
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setBusy(true)
    try {
      await adminCreateBanner({ title: title.trim(), sort_order: banners.length + 1 })
      setTitle('')
      await refresh()
      await loadCatalog()
    } finally {
      setBusy(false)
    }
  }

  const uploadImage = async (banner: Banner, file: File, slot: 'desktop' | 'mobile') => {
    setBusy(true)
    try {
      const url = await adminUploadBannerImage(file, slot)
      await adminUpdateBanner(banner.id, slot === 'desktop' ? { image_desktop_url: url } : { image_mobile_url: url })
      await refresh()
      await loadCatalog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  const patch = async (b: Banner, p: Partial<Banner>) => {
    await adminUpdateBanner(b.id, p)
    await refresh()
    await loadCatalog()
  }

  const remove = async (b: Banner) => {
    if (!confirm(`Delete banner "${b.title}"?`)) return
    await adminDeleteBanner(b.id)
    await refresh()
    await loadCatalog()
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Hero banners</h1>
        <p style={{ color: 'var(--text-muted)' }}>Shown as the homepage hero carousel. Upload a desktop and mobile image for each — with none uploaded, the homepage falls back to a plain text hero.</p>
      </div>

      <form onSubmit={add} style={{ display: 'flex', gap: 'var(--sp-3)' }}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New banner title (e.g. New iPhone 15 cases in stock)" style={{ flex: 1 }} />
        <Button type="submit" disabled={busy}>Add banner</Button>
      </form>

      <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
        {loading && <p style={{ color: 'var(--text-muted)' }}>Loading…</p>}
        {!loading && banners.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No banners yet — add one above.</p>}
        {banners.map((b) => (
          <div key={b.id} style={{ display: 'grid', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Input value={b.title} onChange={(e) => patch(b, { title: e.target.value })} style={{ flex: 1 }} />
              <button onClick={() => patch(b, { enabled: !b.enabled })} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0 }}>
                <Badge tone={b.enabled ? 'stock' : 'info'}>{b.enabled ? 'Live' : 'Hidden'}</Badge>
              </button>
              <button onClick={() => remove(b)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Delete">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
            <Input label="Description (optional)" value={b.description ?? ''} onChange={(e) => patch(b, { description: e.target.value || null })} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
              <Input label="Button label (optional)" value={b.cta_label ?? ''} onChange={(e) => patch(b, { cta_label: e.target.value || null })} />
              <Input label="Button link (e.g. /shop?category=phone-cases)" value={b.cta_href ?? ''} onChange={(e) => patch(b, { cta_href: e.target.value || null })} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
              <BannerImageSlot label="Desktop image" url={b.image_desktop_url} onUpload={(f) => uploadImage(b, f, 'desktop')} />
              <BannerImageSlot label="Mobile image" url={b.image_mobile_url} onUpload={(f) => uploadImage(b, f, 'mobile')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BannerImageSlot({ label, url, onUpload }: { label: string; url: string | null; onUpload: (file: File) => void }) {
  return (
    <label style={{ display: 'block', cursor: 'pointer' }}>
      <span style={{ display: 'block', font: 'var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)', color: 'var(--text-strong)', marginBottom: 'var(--sp-2)' }}>{label}</span>
      <div style={{ width: 180, height: 100, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1.5px dashed var(--border-default)', background: 'var(--gray-100)', display: 'grid', placeItems: 'center' }}>
        {url ? (
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: 'var(--text-faint)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)' }}>Upload</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
          e.target.value = ''
        }}
      />
    </label>
  )
}

function OfferStrips() {
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
    <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Offer strips</h1>
        <p style={{ color: 'var(--text-muted)' }}>Text-only promo banners shown on the homepage and /offers.</p>
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

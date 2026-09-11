import { useEffect, useState } from 'react'
import { Button } from '../../components/ds/Button'
import { Input } from '../../components/ds/Input'
import { loadCatalog } from '../../lib/catalogStore'
import { adminGetSettings, adminUpdateSettings } from './adminApi'
import type { Database } from '../../lib/database.types'

type Settings = Database['public']['Tables']['site_settings']['Row']

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    adminGetSettings().then(setSettings)
  }, [])

  if (!settings) return <div style={{ padding: 'var(--sp-8)', color: 'var(--text-muted)' }}>Loading…</div>

  const field = (key: keyof Settings, label: string, placeholder?: string) => (
    <Input
      label={label}
      value={String(settings[key] ?? '')}
      onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
      placeholder={placeholder}
    />
  );

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setSaved(false)
    await adminUpdateSettings({
      store_name: settings.store_name,
      area: settings.area,
      hours: settings.hours,
      whatsapp_number: settings.whatsapp_number,
      instagram_handle: settings.instagram_handle,
      gst_number: settings.gst_number,
      whatsapp_order_template: settings.whatsapp_order_template,
      whatsapp_enquiry_template: settings.whatsapp_enquiry_template,
      free_delivery_threshold: settings.free_delivery_threshold,
      hero_eyebrow: settings.hero_eyebrow,
      hero_headline: settings.hero_headline,
      hero_subheadline: settings.hero_subheadline,
    })
    await loadCatalog()
    setBusy(false)
    setSaved(true)
  }

  return (
    <form onSubmit={save} style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-5)', maxWidth: 560 }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Store info, WhatsApp and homepage hero copy — no code changes needed.</p>
      </div>

      <section style={{ display: 'grid', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>Store information</div>
        {field('store_name', 'Store name')}
        {field('area', 'Area')}
        {field('hours', 'Hours')}
        {field('gst_number', 'GST number')}
      </section>

      <section style={{ display: 'grid', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>WhatsApp commerce</div>
        {field('whatsapp_number', 'WhatsApp number (country code, no +)', '91XXXXXXXXXX')}
        {field('instagram_handle', 'Instagram handle')}
        <Input
          label="Free delivery threshold (₹)"
          type="number"
          value={String(settings.free_delivery_threshold)}
          onChange={(e) => setSettings({ ...settings, free_delivery_threshold: Number(e.target.value) })}
        />
      </section>

      <section style={{ display: 'grid', gap: 'var(--sp-3)', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>Homepage hero</div>
        {field('hero_eyebrow', 'Eyebrow')}
        {field('hero_headline', 'Headline')}
        {field('hero_subheadline', 'Subheadline')}
      </section>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save settings'}
        </Button>
        {saved && <span style={{ color: 'var(--green-600)', font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)' }}>Saved</span>}
      </div>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { Icon, type IconName } from '../../components/ds/Icon'
import { supabase } from '../../lib/supabase'

interface Stats {
  products: number
  published: number
  lowStock: number
  outOfStock: number
  categories: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function load() {
      const [{ count: products }, { count: published }, { count: lowStock }, { count: outOfStock }, { count: categories }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('products').select('*', { count: 'exact', head: true }).gt('stock', 0).lte('stock', 5),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('stock', 0),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
      ])
      setStats({ products: products ?? 0, published: published ?? 0, lowStock: lowStock ?? 0, outOfStock: outOfStock ?? 0, categories: categories ?? 0 })
    }
    load()
  }, [])

  const cards: { label: string; value: number | string; icon: IconName; tone: string }[] = [
    { label: 'Products', value: stats?.products ?? '—', icon: 'package', tone: 'var(--navy-800)' },
    { label: 'Published', value: stats?.published ?? '—', icon: 'shopping-bag', tone: 'var(--green-600)' },
    { label: 'Low stock (≤5)', value: stats?.lowStock ?? '—', icon: 'battery-charging', tone: 'var(--amber-600)' },
    { label: 'Out of stock', value: stats?.outOfStock ?? '—', icon: 'trash-2', tone: 'var(--red-600)' },
    { label: 'Categories', value: stats?.categories ?? '—', icon: 'smartphone', tone: 'var(--orange-500)' },
  ]

  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-6)' }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Live from your Supabase catalog.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)' }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-pill)', background: 'var(--gray-100)', display: 'grid', placeItems: 'center', marginBottom: 'var(--sp-3)' }}>
              <Icon name={c.icon} size={18} color={c.tone} />
            </div>
            <div style={{ font: '800 28px/1 var(--font-display)', color: 'var(--text-strong)' }}>{c.value}</div>
            <div style={{ color: 'var(--text-muted)', font: 'var(--fw-medium) var(--fs-sm)/1 var(--font-body)', marginTop: 4 }}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

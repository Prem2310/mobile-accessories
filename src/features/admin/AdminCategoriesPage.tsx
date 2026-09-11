import { useEffect, useState } from 'react'
import { Badge } from '../../components/ds/Badge'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { loadCatalog } from '../../lib/catalogStore'
import { adminCreateCategory, adminDeleteCategory, adminListCategories, adminUpdateCategory } from './adminApi'
import type { Database } from '../../lib/database.types'

type Category = Database['public']['Tables']['categories']['Row']

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  const refresh = async () => {
    setLoading(true)
    setCategories(await adminListCategories())
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await adminCreateCategory({ name: name.trim(), slug: slugify(name), sort_order: categories.length + 1 })
    setName('')
    await refresh()
    await loadCatalog()
  }

  const toggle = async (c: Category) => {
    await adminUpdateCategory(c.id, { enabled: !c.enabled })
    await refresh()
    await loadCatalog()
  }

  const move = async (index: number, dir: -1 | 1) => {
    const target = categories[index + dir]
    const current = categories[index]
    if (!target) return
    await Promise.all([
      adminUpdateCategory(current.id, { sort_order: target.sort_order }),
      adminUpdateCategory(target.id, { sort_order: current.sort_order }),
    ])
    await refresh()
    await loadCatalog()
  }

  const remove = async (c: Category) => {
    if (!confirm(`Delete category "${c.name}"? Products in it will keep their category_id pointing nowhere until reassigned.`)) return
    await adminDeleteCategory(c.id)
    await refresh()
    await loadCatalog()
  }

  return (
    <div style={{ padding: 'var(--sp-8)', display: 'grid', gap: 'var(--sp-5)', maxWidth: 640 }}>
      <div>
        <h1 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)' }}>Categories</h1>
        <p style={{ color: 'var(--text-muted)' }}>Reorder with the arrows, enable/disable to control storefront visibility.</p>
      </div>

      <form onSubmit={add} style={{ display: 'flex', gap: 'var(--sp-3)' }}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" style={{ flex: 1 }} />
        <Button type="submit">Add</Button>
      </form>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        {loading && <div style={{ padding: 'var(--sp-5)', color: 'var(--text-muted)' }}>Loading…</div>}
        {!loading &&
          categories.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-3) var(--sp-5)', borderBottom: i < categories.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <button onClick={() => move(i, -1)} disabled={i === 0} style={arrowStyle}>
                  <Icon name="chevron-right" size={12} style={{ transform: 'rotate(-90deg)' }} />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === categories.length - 1} style={arrowStyle}>
                  <Icon name="chevron-right" size={12} style={{ transform: 'rotate(90deg)' }} />
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)', color: 'var(--text-strong)' }}>{c.name}</div>
                <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-faint)' }}>{c.slug}</div>
              </div>
              <button onClick={() => toggle(c)} style={{ border: 0, background: 'none', cursor: 'pointer', padding: 0 }}>
                <Badge tone={c.enabled ? 'stock' : 'info'}>{c.enabled ? 'Enabled' : 'Disabled'}</Badge>
              </button>
              <button onClick={() => remove(c)} style={{ border: 0, background: 'transparent', color: 'var(--gray-400)', cursor: 'pointer' }} aria-label="Delete">
                <Icon name="trash-2" size={16} />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

const arrowStyle: React.CSSProperties = { border: 0, background: 'var(--gray-100)', borderRadius: 4, cursor: 'pointer', width: 20, height: 16, display: 'grid', placeItems: 'center' }

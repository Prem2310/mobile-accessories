import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Button } from '../../components/ds/Button'
import { Checkbox } from '../../components/ds/Checkbox'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { Select } from '../../components/ds/Select'
import { Tag } from '../../components/ds/Tag'
import { getBrands, getCategories, getCategoryBySlug, getCompatibilityOptions, getProducts, type ProductFilter } from '../../lib/catalog'
import { ProductGrid } from './ProductGrid'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'bestselling', label: 'Best selling' },
  { value: 'discount', label: 'Biggest discount' },
]

function useListParam(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key)
  return raw ? raw.split(',').filter(Boolean) : []
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const categorySlug = params.get('category') ?? undefined
  const categories = getCategories()
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined
  const brandOptions = getBrands()
  const compatibilityOptions = getCompatibilityOptions()

  const inStockOnly = params.get('instock') === '1'
  const discountedOnly = params.get('discount') === '1'
  const selectedBrands = useListParam(params, 'brand')
  const selectedCompat = useListParam(params, 'model')
  const minPrice = params.get('min') ? Number(params.get('min')) : undefined
  const maxPrice = params.get('max') ? Number(params.get('max')) : undefined
  const minRating = params.get('rating') ? Number(params.get('rating')) : undefined

  const set = (key: string, value: string | null) =>
    setParams((p) => {
      if (value == null || value === '') p.delete(key)
      else p.set(key, value)
      return p
    })

  const filter: ProductFilter = useMemo(
    () => ({
      categorySlug,
      query: params.get('q') ?? undefined,
      sort: (params.get('sort') as ProductFilter['sort']) ?? 'featured',
      inStockOnly,
      discountedOnly,
      brands: selectedBrands,
      compatibility: selectedCompat,
      minPrice,
      maxPrice,
      minRating,
    }),
    [categorySlug, params],
  )

  const products = getProducts(filter)
  const activeFilterCount = [inStockOnly, discountedOnly, minPrice != null, maxPrice != null, minRating != null].filter(Boolean).length + selectedBrands.length + selectedCompat.length

  const clearAll = () =>
    setParams((p) => {
      ;['instock', 'discount', 'brand', 'model', 'min', 'max', 'rating'].forEach((k) => p.delete(k))
      return p
    })

  const filterControls = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>Filters</div>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} style={{ border: 0, background: 'none', cursor: 'pointer', color: 'var(--ink-900)', font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', textDecoration: 'underline' }}>
            Clear all
          </button>
        )}
      </div>

      <Checkbox label="In stock only" checked={inStockOnly} onChange={(e) => set('instock', e.target.checked ? '1' : null)} />
      <Checkbox label="On discount" checked={discountedOnly} onChange={(e) => set('discount', e.target.checked ? '1' : null)} />

      <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-strong)' }}>Price</div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <Input type="number" placeholder="Min" value={minPrice ?? ''} onChange={(e) => set('min', e.target.value)} style={{ flex: 1 }} />
          <Input type="number" placeholder="Max" value={maxPrice ?? ''} onChange={(e) => set('max', e.target.value)} style={{ flex: 1 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
        <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-strong)' }}>Rating</div>
        <Select
          options={[{ value: '', label: 'Any rating' }, { value: '4', label: '4★ & up' }, { value: '4.5', label: '4.5★ & up' }]}
          value={minRating?.toString() ?? ''}
          onChange={(e) => set('rating', e.target.value || null)}
        />
      </div>

      {compatibilityOptions.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
          <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-strong)' }}>Compatible with</div>
          {compatibilityOptions.map((m) => (
            <Checkbox key={m} label={m} checked={selectedCompat.includes(m)} onChange={() => set('model', toggleInList(selectedCompat, m).join(',') || null)} />
          ))}
        </div>
      )}

      {brandOptions.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
          <div style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-strong)' }}>Brand</div>
          {brandOptions.map((b) => (
            <Checkbox key={b} label={b} checked={selectedBrands.includes(b)} onChange={() => set('brand', toggleInList(selectedBrands, b).join(',') || null)} />
          ))}
        </div>
      )}
    </>
  )

  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <Breadcrumbs items={category ? [{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, category.name] : [{ label: 'Home', href: '/' }, 'Shop']} />
      <SectionHeading
        title={category ? category.name : filter.query ? `Results for “${filter.query}”` : 'Shop everything'}
        subtitle={`${products.length} product${products.length === 1 ? '' : 's'}`}
        action={
          <Select
            options={SORT_OPTIONS}
            value={filter.sort}
            onChange={(e) => set('sort', e.target.value)}
          />
        }
      />

      <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <Tag selected={!categorySlug} onClick={() => set('category', null)}>
          All
        </Tag>
        {categories.map((c) => (
          <Tag key={c.id} selected={categorySlug === c.slug} onClick={() => set('category', c.slug)}>
            {c.name}
          </Tag>
        ))}
      </div>

      <div className="md:hidden">
        <Button variant="outline" onClick={() => setMobileFiltersOpen(true)} iconLeft={<Icon name="sliders-horizontal" size={16} />}>
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{ gap: 'var(--sp-8)', alignItems: 'start' }}>
        <aside className="hidden md:grid" style={{ gap: 'var(--sp-5)', position: 'sticky', top: 110, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
          {filterControls}
        </aside>

        <ProductGrid products={products} />
      </div>

      {mobileFiltersOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={() => setMobileFiltersOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)' }} />
          <div style={{ position: 'relative', width: '100%', maxHeight: '85vh', overflowY: 'auto', background: 'var(--white)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', padding: 'var(--sp-5)', display: 'grid', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ font: 'var(--fw-bold) var(--fs-lg)/1 var(--font-body)', color: 'var(--text-strong)' }}>Filters</div>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ border: 0, background: 'transparent', cursor: 'pointer' }} aria-label="Close">
                <Icon name="x" size={20} />
              </button>
            </div>
            {filterControls}
            <Button onClick={() => setMobileFiltersOpen(false)} fullWidth>
              Show {products.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

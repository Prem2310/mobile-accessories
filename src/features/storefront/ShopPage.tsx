import { useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Button } from '../../components/ds/Button'
import { Checkbox } from '../../components/ds/Checkbox'
import { Icon } from '../../components/ds/Icon'
import { Input } from '../../components/ds/Input'
import { SearchBar } from '../../components/ds/SearchBar'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { Select } from '../../components/ds/Select'
import { Tag } from '../../components/ds/Tag'
import { getCategories, getCategoryBySlug, getProducts, type ProductFilter } from '../../lib/catalog'
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

/** Foldable filter group — Price/Rating/Compatible with/Brand each collapse independently so
    the panel doesn't turn into one long scroll of every facet at once. */
function FilterSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ display: 'grid', gap: 'var(--sp-3)', gridTemplateColumns: 'minmax(0, 1fr)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--sp-3)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: 0, background: 'none', padding: 0, cursor: 'pointer', font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-strong)' }}
      >
        {title}
        <Icon name="chevron-down" size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.3, 1] }}
            style={{ overflow: 'hidden', display: 'grid', gap: 'var(--sp-2)', gridTemplateColumns: 'minmax(0, 1fr)' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 6px 6px 12px',
        borderRadius: 999,
        border: '1px solid var(--border-default)',
        background: 'var(--surface-sunken)',
        font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)',
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        style={{ border: 0, background: 'var(--gray-100)', borderRadius: '50%', width: 18, height: 18, padding: 0, cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}
      >
        <Icon name="x" size={11} />
      </button>
    </span>
  )
}

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const categorySlug = params.get('category') ?? undefined
  const searchQuery = params.get('q') ?? ''
  const focusSearch = params.get('focusSearch') === '1'
  const categories = getCategories()
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined

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

  // Scoped to the current category (+ search) rather than the whole catalog, so "Brand" and
  // "Compatible with" only show up — and only list values — when they're actually meaningful
  // for what's on screen (e.g. power banks don't have a phone-model compatibility facet).
  const categoryProducts = useMemo(() => getProducts({ categorySlug, query: filter.query }), [categorySlug, filter.query])
  const brandOptions = useMemo(
    () => Array.from(new Set(categoryProducts.map((p) => p.brand).filter((b): b is string => Boolean(b)))).sort(),
    [categoryProducts],
  )
  const compatibilityOptions = useMemo(() => Array.from(new Set(categoryProducts.flatMap((p) => p.compatibility ?? []))).sort(), [categoryProducts])

  const clearAll = () =>
    setParams((p) => {
      ;['instock', 'discount', 'brand', 'model', 'min', 'max', 'rating'].forEach((k) => p.delete(k))
      return p
    })

  const appliedFilters = [
    searchQuery && { key: 'q', label: `“${searchQuery}”`, onRemove: () => set('q', null) },
    inStockOnly && { key: 'instock', label: 'In stock only', onRemove: () => set('instock', null) },
    discountedOnly && { key: 'discount', label: 'On discount', onRemove: () => set('discount', null) },
    minPrice != null && { key: 'min', label: `Min ₹${minPrice}`, onRemove: () => set('min', null) },
    maxPrice != null && { key: 'max', label: `Max ₹${maxPrice}`, onRemove: () => set('max', null) },
    minRating != null && { key: 'rating', label: `${minRating}★ & up`, onRemove: () => set('rating', null) },
    ...selectedCompat.map((m) => ({ key: `model-${m}`, label: m, onRemove: () => set('model', toggleInList(selectedCompat, m).join(',') || null) })),
    ...selectedBrands.map((b) => ({ key: `brand-${b}`, label: b, onRemove: () => set('brand', toggleInList(selectedBrands, b).join(',') || null) })),
  ].filter(Boolean) as { key: string; label: string; onRemove: () => void }[]

  const filterControls = (
    <>
      <Checkbox label="In stock only" checked={inStockOnly} onChange={(e) => set('instock', e.target.checked ? '1' : null)} />
      <Checkbox label="On discount" checked={discountedOnly} onChange={(e) => set('discount', e.target.checked ? '1' : null)} />

      <FilterSection title="Price">
        <div style={{ display: 'flex', gap: 'var(--sp-2)', minWidth: 0 }}>
          <Input type="number" placeholder="Min" value={minPrice ?? ''} onChange={(e) => set('min', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
          <Input type="number" placeholder="Max" value={maxPrice ?? ''} onChange={(e) => set('max', e.target.value)} style={{ flex: 1, minWidth: 0 }} />
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <Select
          options={[{ value: '', label: 'Any rating' }, { value: '4', label: '4★ & up' }, { value: '4.5', label: '4.5★ & up' }]}
          value={minRating?.toString() ?? ''}
          onChange={(e) => set('rating', e.target.value || null)}
        />
      </FilterSection>

      {compatibilityOptions.length > 0 && (
        <FilterSection title="Compatible with" defaultOpen={false}>
          {compatibilityOptions.map((m) => (
            <Checkbox key={m} label={m} checked={selectedCompat.includes(m)} onChange={() => set('model', toggleInList(selectedCompat, m).join(',') || null)} />
          ))}
        </FilterSection>
      )}

      {brandOptions.length > 0 && (
        <FilterSection title="Brand" defaultOpen={false}>
          {brandOptions.map((b) => (
            <Checkbox key={b} label={b} checked={selectedBrands.includes(b)} onChange={() => set('brand', toggleInList(selectedBrands, b).join(',') || null)} />
          ))}
        </FilterSection>
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

      <SearchBar
        value={searchQuery}
        onChange={(e) => set('q', e.target.value)}
        autoFocus={focusSearch}
        style={{ maxWidth: 480 }}
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

      {appliedFilters.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <span style={{ font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-muted)' }}>Applied filters:</span>
          {appliedFilters.map((f) => (
            <FilterChip key={f.key} label={f.label} onRemove={f.onRemove} />
          ))}
          <button
            type="button"
            onClick={clearAll}
            style={{ border: 0, background: 'none', cursor: 'pointer', color: 'var(--ink-900)', font: 'var(--fw-bold) var(--fs-xs)/1 var(--font-body)', textDecoration: 'underline' }}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="md:hidden">
        <Button variant="outline" onClick={() => setMobileFiltersOpen(true)} iconLeft={<Icon name="sliders-horizontal" size={16} />}>
          Filters{appliedFilters.length > 0 ? ` (${appliedFilters.length})` : ''}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{ gap: 'var(--sp-8)', alignItems: 'start' }}>
        <aside className="hidden md:grid" style={{ gap: 'var(--sp-4)', gridTemplateColumns: 'minmax(0, 1fr)', position: 'sticky', top: 110, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)', minWidth: 0 }}>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>Filters</div>
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

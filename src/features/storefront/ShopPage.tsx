import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Checkbox } from '../../components/ds/Checkbox'
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

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const categorySlug = params.get('category') ?? undefined
  const [inStockOnly, setInStockOnly] = useState(false)
  const [discountedOnly, setDiscountedOnly] = useState(false)
  const categories = getCategories()
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined

  const filter: ProductFilter = useMemo(
    () => ({
      categorySlug,
      query: params.get('q') ?? undefined,
      sort: (params.get('sort') as ProductFilter['sort']) ?? 'featured',
      inStockOnly,
      discountedOnly,
    }),
    [categorySlug, params, inStockOnly, discountedOnly],
  )

  const products = getProducts(filter)

  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <Breadcrumbs items={category ? [{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, category.name] : [{ label: 'Home', href: '/' }, 'Shop']} />
      <SectionHeading
        eyebrow={category ? category.name : 'All products'}
        title={category ? category.name : filter.query ? `Results for “${filter.query}”` : 'Shop everything'}
        action={
          <Select
            options={SORT_OPTIONS}
            value={filter.sort}
            onChange={(e) => setParams((p) => { p.set('sort', e.target.value); return p })}
          />
        }
      />

      <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <Tag selected={!categorySlug} onClick={() => setParams((p) => { p.delete('category'); return p })}>
          All
        </Tag>
        {categories.map((c) => (
          <Tag key={c.id} selected={categorySlug === c.slug} onClick={() => setParams((p) => { p.set('category', c.slug); return p })}>
            {c.name}
          </Tag>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]" style={{ gap: 'var(--sp-8)', alignItems: 'start' }}>
        <aside className="hidden md:grid" style={{ gap: 'var(--sp-5)', position: 'sticky', top: 110, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--sp-5)' }}>
          <div style={{ font: 'var(--fw-bold) var(--fs-sm)/1 var(--font-body)', color: 'var(--text-strong)' }}>Filters</div>
          <Checkbox label="In stock only" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          <Checkbox label="On discount" checked={discountedOnly} onChange={(e) => setDiscountedOnly(e.target.checked)} />
        </aside>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ds/Breadcrumbs'
import { Icon } from '../../components/ds/Icon'
import { SectionHeading } from '../../components/ds/SectionHeading'
import { getCategories, getCategoryProductCount } from '../../lib/catalog'

export function CategoriesPage() {
  const categories = getCategories()
  return (
    <div className="container-page py-10" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, 'Categories']} />
      <SectionHeading title="Shop by category" subtitle={`${categories.length} categories`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--sp-4)' }}>
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/shop?category=${c.slug}`}
            style={{
              display: 'grid',
              justifyItems: 'center',
              gap: 'var(--sp-3)',
              padding: 'var(--sp-6) var(--sp-4)',
              background: 'var(--white)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'var(--transition-control)',
            }}
          >
            <Icon name={c.icon ?? 'package'} size={30} color="var(--ink-900)" />
            <div
              style={{
                font: 'var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)',
                color: 'var(--text-strong)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: 36,
              }}
            >
              {c.name}
            </div>
            <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1 var(--font-body)', color: 'var(--text-muted)' }}>{getCategoryProductCount(c.id)} products</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

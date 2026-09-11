import { Link } from 'react-router-dom'
import { Button } from '../../components/ds/Button'
import { Icon } from '../../components/ds/Icon'

export function NotFoundPage() {
  return (
    <div className="container-page py-20" style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-4)', textAlign: 'center' }}>
      <Icon name="package" size={40} color="var(--gray-300)" />
      <div style={{ font: 'var(--type-h2)', color: 'var(--text-strong)' }}>Page not found</div>
      <p style={{ color: 'var(--text-muted)', maxWidth: 360 }}>That link may be outdated. Try the shop, or head back home.</p>
      <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
        <Link to="/">
          <Button variant="outline">Go home</Button>
        </Link>
        <Link to="/shop">
          <Button>Shop everything</Button>
        </Link>
      </div>
    </div>
  )
}

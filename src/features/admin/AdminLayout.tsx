import { NavLink, Outlet } from 'react-router-dom'
import { Icon, type IconName } from '../../components/ds/Icon'
import { supabase } from '../../lib/supabase'
import { AdminLogin } from './AdminLogin'
import { useAdminAuth } from './useAdminAuth'

const NAV: { to: string; label: string; icon: IconName }[] = [
  { to: '/admin', label: 'Dashboard', icon: 'store' },
  { to: '/admin/products', label: 'Products', icon: 'package' },
  { to: '/admin/categories', label: 'Categories', icon: 'shopping-bag' },
  { to: '/admin/banners', label: 'Banners & Offers', icon: 'zap' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'star' },
  { to: '/admin/settings', label: 'Settings', icon: 'sliders-horizontal' },
]

export function AdminLayout() {
  const { loading, session, admin, needsBootstrap } = useAdminAuth()

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>Loading…</div>
  }

  if (!session || (!admin && !needsBootstrap)) {
    return <AdminLogin needsBootstrap={needsBootstrap} />
  }

  if (session && !admin && needsBootstrap) {
    // signUp succeeded but the admins-row insert (see AdminLogin) may still be in flight; re-render shortly.
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>Setting up your account…</div>
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <aside style={{ width: 220, flex: '0 0 auto', background: 'var(--navy-900)', color: '#fff', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--sp-5)' }}>
          <div style={{ font: '800 22px/1 var(--font-display)' }}>
            ISTUFF
          </div>
          <div style={{ font: 'var(--fw-bold) 10px/1 var(--font-body)', letterSpacing: 'var(--ls-caps)', color: 'var(--navy-200)', textTransform: 'uppercase', marginTop: 4 }}>Admin</div>
        </div>
        <nav style={{ display: 'grid', gap: 2, padding: 'var(--sp-3)', flex: 1, overflowY: 'auto' }}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-3)',
                padding: '10px var(--sp-4)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                color: isActive ? '#fff' : 'var(--navy-200)',
                background: isActive ? 'rgba(255,255,255,.1)' : 'transparent',
                font: 'var(--fw-semibold) var(--fs-sm)/1 var(--font-body)',
              })}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: 'var(--sp-4)', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ font: 'var(--fw-medium) var(--fs-xs)/1.4 var(--font-body)', color: 'var(--navy-200)', marginBottom: 8 }}>
            {session.user.email} · {admin?.role}
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{ border: 0, background: 'transparent', color: 'var(--navy-200)', cursor: 'pointer', font: 'var(--fw-semibold) var(--fs-xs)/1 var(--font-body)', padding: 0 }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, background: 'var(--surface-page)', minHeight: '100vh', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}

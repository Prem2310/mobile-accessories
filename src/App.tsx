import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './app/Layout'
import { CategoriesPage } from './features/storefront/CategoriesPage'
import { HomePage } from './features/storefront/HomePage'
import { NotFoundPage } from './features/storefront/NotFoundPage'
import { OffersPage } from './features/storefront/OffersPage'
import { ProductPage } from './features/storefront/ProductPage'
import { ShopPage } from './features/storefront/ShopPage'
import { WishlistPage } from './features/storefront/WishlistPage'

// Admin is a separate audience (the shop owner) from the storefront (customers) —
// code-split so customers never download the admin bundle.
const AdminLayout = lazy(() => import('./features/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })))
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })))
const AdminProductsPage = lazy(() => import('./features/admin/AdminProductsPage').then((m) => ({ default: m.AdminProductsPage })))
const AdminCategoriesPage = lazy(() => import('./features/admin/AdminCategoriesPage').then((m) => ({ default: m.AdminCategoriesPage })))
const AdminBannersPage = lazy(() => import('./features/admin/AdminBannersPage').then((m) => ({ default: m.AdminBannersPage })))
const AdminSettingsPage = lazy(() => import('./features/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="admin"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>Loading…</div>}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="banners" element={<AdminBannersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

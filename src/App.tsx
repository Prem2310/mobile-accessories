import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './app/Layout'
import { CategoriesPage } from './features/storefront/CategoriesPage'
import { HomePage } from './features/storefront/HomePage'
import { OffersPage } from './features/storefront/OffersPage'
import { ProductPage } from './features/storefront/ProductPage'
import { ShopPage } from './features/storefront/ShopPage'
import { WishlistPage } from './features/storefront/WishlistPage'

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

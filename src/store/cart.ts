import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../lib/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  setQuantity: (productId: string, quantity: number, variantId?: string) => void
  clear: () => void
}

const lineKey = (productId: string, variantId?: string) => `${productId}::${variantId ?? ''}`

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (item) =>
        set((state) => {
          const key = lineKey(item.productId, item.variantId)
          const existing = state.items.find((it) => lineKey(it.productId, it.variantId) === key)
          if (existing) {
            return {
              items: state.items.map((it) =>
                lineKey(it.productId, it.variantId) === key ? { ...it, quantity: it.quantity + item.quantity } : it,
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, item], isOpen: true }
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({ items: state.items.filter((it) => lineKey(it.productId, it.variantId) !== lineKey(productId, variantId)) })),
      setQuantity: (productId, quantity, variantId) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((it) => lineKey(it.productId, it.variantId) !== lineKey(productId, variantId))
              : state.items.map((it) => (lineKey(it.productId, it.variantId) === lineKey(productId, variantId) ? { ...it, quantity } : it)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'raghav-cart', partialize: (state) => ({ items: state.items }) },
  ),
)

export function useCartTotal() {
  return useCartStore((s) => s.items.reduce((sum, it) => sum + it.price * it.quantity, 0))
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, it) => sum + it.quantity, 0))
}

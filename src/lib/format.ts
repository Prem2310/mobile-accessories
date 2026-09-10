export function formatINR(amount: number): string {
  return '₹' + Math.round(amount).toLocaleString('en-IN')
}

export function discountPercent(price: number, mrp?: number): number | null {
  if (!mrp || mrp <= price) return null
  return Math.round((1 - price / mrp) * 100)
}

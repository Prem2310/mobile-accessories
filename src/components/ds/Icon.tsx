import {
  ArrowRight,
  BatteryCharging,
  Cable,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Headphones,
  Heart,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Star,
  Store,
  Trash2,
  Truck,
  User,
  X,
  Zap,
  type LucideProps,
} from 'lucide-react'
import type { CSSProperties } from 'react'

/** lucide-react dropped brand glyphs; Instagram is a brand mark we still need, so it's a hand-drawn 2px-stroke SVG kept visually consistent with the Lucide set (same viewBox/stroke conventions). */
function InstagramGlyph({ size = 20, strokeWidth = 2, color = 'currentColor' }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

/** Names used across this app, mapped to the installed lucide-react icon set (design system spec'd Lucide via CDN; we use the npm package for a real bundle instead). */
const ICONS = {
  'arrow-right': ArrowRight,
  'battery-charging': BatteryCharging,
  cable: Cable,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  clock: Clock,
  filter: Filter,
  headphones: Headphones,
  heart: Heart,
  info: Info,
  instagram: InstagramGlyph,
  'map-pin': MapPin,
  menu: Menu,
  'message-circle': MessageCircle,
  minus: Minus,
  package: Package,
  plus: Plus,
  search: Search,
  'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag,
  'sliders-horizontal': SlidersHorizontal,
  smartphone: Smartphone,
  star: Star,
  store: Store,
  'trash-2': Trash2,
  truck: Truck,
  user: User,
  x: X,
  zap: Zap,
} satisfies Record<string, React.ComponentType<LucideProps>>

export type IconName = keyof typeof ICONS

export interface IconProps {
  name: IconName
  size?: number
  strokeWidth?: number
  color?: string
  style?: CSSProperties
  className?: string
}

export function Icon({ name, size = 20, strokeWidth = 2, color = 'currentColor', style, className }: IconProps) {
  const Glyph = ICONS[name]
  if (!Glyph) {
    if (import.meta.env.DEV) console.warn(`Icon: "${name}" is not in the icon map — add it to src/components/ds/Icon.tsx`)
    return null
  }
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      style={{ flex: '0 0 auto', ...style }}
      className={className}
      aria-hidden="true"
    />
  )
}

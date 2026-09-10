import * as React from "react";
/**
 * Catalogue tile: square photo, badge, title, rating, price, add-to-cart.
 * @startingPoint section="Commerce" subtitle="Product grid tile with price and badge" viewport="700x400"
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  /** Compatibility line, e.g. "iPhone 13 / 13 Pro". */
  subtitle?: string;
  price: number;
  mrp?: number;
  badge?: { label: string; tone?: "sale" | "new" | "stock" | "out" | "info" | "warn" };
  rating?: number;
  reviews?: number;
  image?: string;
  imageAlt?: string;
  onAdd?: () => void;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;

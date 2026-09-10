import * as React from "react";
/** Rupee price with optional struck MRP and green savings percentage. */
export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  /** Original price; renders struck-through plus a % off figure. */
  mrp?: number;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}
export declare function Price(props: PriceProps): JSX.Element;

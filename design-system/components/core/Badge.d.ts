import * as React from "react";
/** Small uppercase status flag on product cards and rows (SALE, NEW, IN STOCK). */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "sale" */
  tone?: "sale" | "new" | "stock" | "out" | "info" | "warn";
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;

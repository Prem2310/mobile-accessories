import * as React from "react";
/**
 * White (or navy) rounded surface with the standard soft shadow — the base container for everything.
 * @startingPoint section="Core" subtitle="Rounded card surfaces, light and navy" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS padding. @default "var(--sp-5)" */
  padding?: string;
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  /** @default "light" */
  tone?: "light" | "dark";
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;

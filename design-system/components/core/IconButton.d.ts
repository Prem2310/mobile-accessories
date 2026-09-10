import * as React from "react";
/** Circular icon-only control for header, cards and toolbars. Always pass an accessible label. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name, required. */
  label: string;
  /** @default "neutral" */
  tone?: "neutral" | "brand" | "onDark";
  /** Square px size. @default 44 */
  size?: number;
  active?: boolean;
  children?: React.ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;

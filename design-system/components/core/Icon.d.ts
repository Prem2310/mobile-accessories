import * as React from "react";
/** Lucide icon wrapper (2px stroke, rounded caps). Requires the Lucide UMD script on the page. */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, e.g. "shopping-bag", "smartphone", "shield-check". */
  name: string;
  /** @default 20 */
  size?: number;
  /** @default 2 */
  strokeWidth?: number;
  color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;

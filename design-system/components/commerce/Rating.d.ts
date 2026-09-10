import * as React from "react";
/** Compact green rating chip with optional review count. */
export interface RatingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 4.5 */
  value?: number;
  count?: number;
  /** Star glyph px size. @default 14 */
  size?: number;
}
export declare function Rating(props: RatingProps): JSX.Element;

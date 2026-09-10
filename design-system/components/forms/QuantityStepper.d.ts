import * as React from "react";
/** Quantity control on product pages and in the cart. */
export interface QuantityStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;

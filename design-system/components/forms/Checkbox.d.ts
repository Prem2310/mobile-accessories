import * as React from "react";
/** Filter/consent checkbox with optional result count on the right. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  checked?: boolean;
  /** Result count shown right-aligned in mono. */
  count?: number;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;

import * as React from "react";
/** Single-line text field with label, hint and error states. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message; replaces hint and turns the field red. */
  error?: string;
  iconLeft?: React.ReactNode;
  suffix?: React.ReactNode;
}
export declare function Input(props: InputProps): JSX.Element;

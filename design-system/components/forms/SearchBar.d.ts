import * as React from "react";
/** Pill search field with orange submit — sits in the site header. */
export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: (value?: string) => void;
  style?: React.CSSProperties;
}
export declare function SearchBar(props: SearchBarProps): JSX.Element;

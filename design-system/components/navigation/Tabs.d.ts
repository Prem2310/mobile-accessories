import * as React from "react";
/** Underlined tab row (orange indicator) for product detail sections and account views. */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;

import * as React from "react";
/** Section title block: orange uppercase eyebrow, display heading, optional right-side action. */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  /** @default "light" */
  tone?: "light" | "dark";
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;

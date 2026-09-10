import * as React from "react";
/** Category trail above product listings and detail pages. */
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<string | { label: string; href?: string }>;
}
export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;

import * as React from "react";
/** Wide promo strip for combo deals, free-fitting offers and festival sales. */
export interface OfferBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  /** @default "navy" */
  tone?: "navy" | "orange";
}
export declare function OfferBanner(props: OfferBannerProps): JSX.Element;

import * as React from "react";
/**
 * Primary action control. Orange pill = buy/act, navy = secondary, WhatsApp green = order-on-chat.
 * @startingPoint section="Core" subtitle="Pill buttons in all brand variants" viewport="700x180"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual role. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as anchor. @default "button" */
  as?: "button" | "a";
  href?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;

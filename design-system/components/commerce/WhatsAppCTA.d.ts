import * as React from "react";
/**
 * WhatsApp order link — the shop's real checkout channel. Can float bottom-right on every page.
 * @startingPoint section="Commerce" subtitle="WhatsApp order button, inline and floating" viewport="700x160"
 */
export interface WhatsAppCTAProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Country-coded number without +, e.g. "919999999999". */
  phone?: string;
  /** Pre-filled chat message. */
  message?: string;
  /** @default "Order on WhatsApp" */
  label?: string;
  /** Pin bottom-right of the viewport. @default false */
  floating?: boolean;
}
export declare function WhatsAppCTA(props: WhatsAppCTAProps): JSX.Element;

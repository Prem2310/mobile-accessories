import React from "react";

import {Icon} from "../core/Icon.jsx";
export function WhatsAppCTA({phone="919999999999",message="Hi Raghav Mobile Accessories, I want to order:",label="Order on WhatsApp",floating=false,style,...rest}){
  const [h,setH]=React.useState(false);
  const href="https://wa.me/"+phone+"?text="+encodeURIComponent(message);
  const pos=floating?{position:"fixed",right:"var(--sp-6)",bottom:"var(--sp-6)",zIndex:50,boxShadow:"var(--shadow-hover)"}:{};
  return <a href={href} target="_blank" rel="noreferrer" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"inline-flex",alignItems:"center",gap:"var(--sp-3)",height:"var(--control-lg)",padding:"0 var(--sp-6)",
      borderRadius:"var(--radius-pill)",background:h?"var(--whatsapp-dark)":"var(--whatsapp)",color:"var(--white)",
      font:"var(--fw-bold) var(--fs-base)/1 var(--font-body)",textDecoration:"none",
      transition:"var(--transition-control)",transform:h?"var(--lift-hover)":"none",...pos,...style}} {...rest}>
    <Icon name="message-circle" size={20}/>{label}
  </a>;
}

import React from "react";

export function Card({padding="var(--sp-5)",interactive=false,tone="light",children,style,...rest}){
  const [h,setH]=React.useState(false);
  const dark=tone==="dark";
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:dark?"var(--surface-dark)":"var(--surface-card)",color:dark?"var(--text-on-dark)":"var(--text-body)",
      border:"1px solid "+(dark?"transparent":"var(--border-subtle)"),borderRadius:"var(--radius-lg)",padding,
      boxShadow:interactive&&h?"var(--shadow-hover)":"var(--shadow-card)",
      transform:interactive&&h?"var(--lift-hover)":"none",
      transition:"box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)",...style}} {...rest}>{children}</div>;
}

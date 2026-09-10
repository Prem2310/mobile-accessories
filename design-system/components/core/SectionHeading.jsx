import React from "react";

export function SectionHeading({eyebrow,title,action,align="left",tone="light",style,...rest}){
  const dark=tone==="dark";
  return <div style={{display:"flex",alignItems:"flex-end",justifyContent:align==="center"?"center":"space-between",
    gap:"var(--sp-4)",marginBottom:"var(--sp-5)",textAlign:align,...style}} {...rest}>
    <div>
      {eyebrow&&<div style={{font:"var(--type-label)",letterSpacing:"var(--ls-caps)",textTransform:"uppercase",
        color:"var(--orange-500)",marginBottom:"var(--sp-2)"}}>{eyebrow}</div>}
      <h2 style={{font:"var(--type-h2)",color:dark?"var(--white)":"var(--text-strong)"}}>{title}</h2>
    </div>
    {action}
  </div>;
}

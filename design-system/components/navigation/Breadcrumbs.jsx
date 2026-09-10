import React from "react";

export function Breadcrumbs({items=[],style,...rest}){
  return <nav style={{display:"flex",alignItems:"center",gap:"var(--sp-2)",flexWrap:"wrap",
    font:"var(--fw-medium) var(--fs-sm)/1 var(--font-body)",color:"var(--text-muted)",...style}} {...rest}>
    {items.map((it,i)=>{const last=i===items.length-1;const l=typeof it==="string"?it:it.label;
      return <React.Fragment key={i}>
        {last?<span style={{color:"var(--text-strong)",fontWeight:"var(--fw-bold)"}}>{l}</span>
          :<a href={(it&&it.href)||"#"} style={{color:"var(--text-muted)",fontWeight:"var(--fw-medium)"}}>{l}</a>}
        {!last&&<span style={{color:"var(--text-faint)"}}>/</span>}
      </React.Fragment>})}
  </nav>;
}

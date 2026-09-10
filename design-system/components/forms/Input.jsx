import React from "react";

export function Input({label,hint,error,iconLeft,suffix,style,...rest}){
  const [foc,setFoc]=React.useState(false);
  return <label style={{display:"block",...style}}>
    {label&&<span style={{display:"block",font:"var(--fw-bold) var(--fs-sm)/1.2 var(--font-body)",color:"var(--text-strong)",marginBottom:"var(--sp-2)"}}>{label}</span>}
    <span style={{display:"flex",alignItems:"center",gap:"var(--sp-2)",height:"var(--control-md)",padding:"0 var(--sp-4)",
      background:"var(--white)",borderRadius:"var(--radius-md)",
      border:"1.5px solid "+(error?"var(--red-600)":foc?"var(--orange-500)":"var(--border-default)"),
      boxShadow:foc?"var(--ring-brand)":"none",transition:"var(--transition-control)"}}>
      {iconLeft}
      <input onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{flex:1,border:0,outline:0,background:"transparent",font:"var(--type-body)",color:"var(--text-strong)",minWidth:0}} {...rest}/>
      {suffix}
    </span>
    {(hint||error)&&<span style={{display:"block",marginTop:"var(--sp-2)",font:"var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",
      color:error?"var(--red-600)":"var(--text-muted)"}}>{error||hint}</span>}
  </label>;
}

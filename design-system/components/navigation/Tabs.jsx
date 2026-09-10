import React from "react";

export function Tabs({items=[],value,onChange,style,...rest}){
  return <div role="tablist" style={{display:"flex",gap:"var(--sp-6)",borderBottom:"1px solid var(--border-subtle)",...style}} {...rest}>
    {items.map(it=>{const v=typeof it==="string"?it:it.value,l=typeof it==="string"?it:it.label,on=v===value;
      return <button key={v} role="tab" aria-selected={on} onClick={()=>onChange&&onChange(v)}
        style={{border:0,background:"transparent",cursor:"pointer",padding:"0 0 var(--sp-3)",
          font:"var(--fw-bold) var(--fs-base)/1 var(--font-body)",color:on?"var(--navy-800)":"var(--text-muted)",
          borderBottom:"3px solid "+(on?"var(--orange-500)":"transparent"),marginBottom:-1,
          transition:"var(--transition-control)"}}>{l}</button>})}
  </div>;
}

import React from "react";

import {Icon} from "../core/Icon.jsx";
export function Rating({value=4.5,count,size=14,style,...rest}){
  return <span style={{display:"inline-flex",alignItems:"center",gap:"var(--sp-1)",...style}} {...rest}>
    <span style={{display:"inline-flex",alignItems:"center",gap:"var(--sp-1)",background:"var(--green-100)",
      color:"var(--green-600)",padding:"3px 7px",borderRadius:"var(--radius-xs)",
      font:"var(--fw-bold) var(--fs-xs)/1 var(--font-body)"}}>
      {value.toFixed(1)}<Icon name="star" size={size-2}/>
    </span>
    {count!=null&&<span style={{font:"var(--fw-medium) var(--fs-xs)/1 var(--font-body)",color:"var(--text-muted)"}}>({count})</span>}
  </span>;
}

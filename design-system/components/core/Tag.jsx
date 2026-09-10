import React from "react";

export function Tag({selected=false,onClick,children,style,...rest}){
  const [h,setH]=React.useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
   style={{font:"var(--fw-semibold) var(--fs-sm)/1 var(--font-body)",padding:"0 var(--sp-4)",height:"var(--control-sm)",
    borderRadius:"var(--radius-pill)",cursor:"pointer",transition:"var(--transition-control)",
    border:"1.5px solid "+(selected?"var(--navy-800)":"var(--border-default)"),
    background:selected?"var(--navy-800)":h?"var(--navy-50)":"var(--white)",
    color:selected?"var(--white)":"var(--navy-800)",...style}} {...rest}>{children}</button>;
}

import React from "react";

export function IconButton({label,tone="neutral",size=44,active=false,children,style,...rest}){
  const [h,setH]=React.useState(false);
  const tones={neutral:{color:"var(--navy-800)",bg:h?"var(--gray-100)":"transparent"},
    brand:{color:h?"var(--white)":"var(--orange-500)",bg:h?"var(--orange-500)":"var(--orange-50)"},
    onDark:{color:"var(--white)",bg:h?"rgba(255,255,255,.16)":"transparent"}}[tone];
  return <button aria-label={label} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{width:size,height:size,display:"inline-flex",alignItems:"center",justifyContent:"center",
      borderRadius:"var(--radius-pill)",border:active?"1.5px solid var(--orange-500)":"1.5px solid transparent",
      background:tones.bg,color:tones.color,cursor:"pointer",transition:"var(--transition-control)",...style}} {...rest}>{children}</button>;
}

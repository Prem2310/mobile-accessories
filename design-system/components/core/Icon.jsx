import React from "react";

/* Wrapper over the Lucide icon set (CDN: lucide UMD must be on the page). */
export function Icon({name,size=20,strokeWidth=2,color="currentColor",style,...rest}){
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const el=ref.current;if(!el)return;
    const draw=()=>{if(window.lucide&&el){el.innerHTML="";const i=document.createElement("i");i.setAttribute("data-lucide",name);el.appendChild(i);window.lucide.createIcons({attrs:{width:size,height:size,"stroke-width":strokeWidth},nameAttr:"data-lucide"});}};
    draw();const t=setTimeout(draw,300);return()=>clearTimeout(t);
  },[name,size,strokeWidth]);
  return <span ref={ref} aria-hidden="true" style={{display:"inline-flex",width:size,height:size,color,flex:"0 0 auto",...style}} {...rest}/>;
}

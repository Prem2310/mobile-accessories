import React from "react";

import {Icon} from "../core/Icon.jsx";
export function SearchBar({placeholder="Search covers, glass, chargers…",value,onChange,onSubmit,style,...rest}){
  const [foc,setFoc]=React.useState(false);
  return <form onSubmit={e=>{e.preventDefault();onSubmit&&onSubmit(value)}}
    style={{display:"flex",alignItems:"center",gap:"var(--sp-3)",height:"var(--control-md)",padding:"0 var(--sp-3) 0 var(--sp-4)",
      background:"var(--white)",borderRadius:"var(--radius-pill)",
      border:"1.5px solid "+(foc?"var(--orange-500)":"transparent"),boxShadow:foc?"var(--ring-brand)":"var(--shadow-card)",
      transition:"var(--transition-control)",...style}} {...rest}>
    <Icon name="search" size={18} color="var(--gray-400)"/>
    <input value={value} onChange={onChange} placeholder={placeholder} onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
      style={{flex:1,border:0,outline:0,background:"transparent",font:"var(--type-body)",color:"var(--text-strong)",minWidth:0}}/>
    <button type="submit" style={{height:34,padding:"0 var(--sp-4)",border:0,borderRadius:"var(--radius-pill)",
      background:"var(--orange-500)",color:"var(--white)",font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",cursor:"pointer"}}>Search</button>
  </form>;
}

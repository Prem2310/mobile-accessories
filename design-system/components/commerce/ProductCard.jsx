import React from "react";

import {Badge} from "../core/Badge.jsx";
import {Price} from "./Price.jsx";
import {Rating} from "./Rating.jsx";
import {IconButton} from "../core/IconButton.jsx";
import {Icon} from "../core/Icon.jsx";
export function ProductCard({title,subtitle,price,mrp,badge,rating,reviews,image,imageAlt="",onAdd,onClick,style,...rest}){
  const [h,setH]=React.useState(false);
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:"var(--surface-card)",border:"1px solid var(--border-subtle)",borderRadius:"var(--radius-lg)",
      overflow:"hidden",cursor:"pointer",boxShadow:h?"var(--shadow-hover)":"var(--shadow-card)",
      transform:h?"var(--lift-hover)":"none",transition:"box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)",...style}} {...rest}>
    <div style={{position:"relative",aspectRatio:"1/1",background:"var(--surface-sunken)",display:"grid",placeItems:"center"}}>
      {image?<img src={image} alt={imageAlt} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        :<span style={{font:"var(--fw-bold) var(--fs-xs)/1.4 var(--font-body)",color:"var(--text-faint)",textAlign:"center",padding:"var(--sp-4)"}}>Product photo</span>}
      {badge&&<span style={{position:"absolute",top:"var(--sp-3)",left:"var(--sp-3)"}}><Badge tone={badge.tone||"sale"}>{badge.label}</Badge></span>}
      <span style={{position:"absolute",top:"var(--sp-2)",right:"var(--sp-2)",opacity:h?1:0,transition:"opacity var(--dur-base) var(--ease-out)"}}>
        <IconButton label="Add to wishlist" tone="brand" size={36} onClick={e=>e.stopPropagation()}><Icon name="heart" size={16}/></IconButton>
      </span>
    </div>
    <div style={{padding:"var(--sp-4)",display:"grid",gap:"var(--sp-2)"}}>
      <div style={{font:"var(--fw-bold) var(--fs-base)/1.3 var(--font-body)",color:"var(--text-strong)",
        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{title}</div>
      {subtitle&&<div style={{font:"var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",color:"var(--text-muted)"}}>{subtitle}</div>}
      {rating!=null&&<Rating value={rating} count={reviews}/>}
      <Price amount={price} mrp={mrp}/>
      <button onClick={e=>{e.stopPropagation();onAdd&&onAdd()}}
        style={{marginTop:"var(--sp-1)",height:"var(--control-sm)",border:"1.5px solid var(--orange-500)",borderRadius:"var(--radius-pill)",
          background:h?"var(--orange-500)":"var(--orange-50)",color:h?"var(--white)":"var(--orange-600)",
          font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",cursor:"pointer",transition:"var(--transition-control)"}}>Add to cart</button>
    </div>
  </div>;
}

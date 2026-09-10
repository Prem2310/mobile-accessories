import React from "react";

const base={font:"var(--fw-bold) var(--fs-base)/1 var(--font-body)",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"var(--sp-2)",border:"1.5px solid transparent",borderRadius:"var(--radius-pill)",cursor:"pointer",transition:"var(--transition-control)",whiteSpace:"nowrap",textDecoration:"none"};
const sizes={sm:{height:"var(--control-sm)",padding:"0 var(--sp-4)",fontSize:"var(--fs-sm)"},md:{height:"var(--control-md)",padding:"0 var(--sp-6)"},lg:{height:"var(--control-lg)",padding:"0 var(--sp-8)",fontSize:"var(--fs-lg)"}};
const variants={
  primary:{background:"var(--orange-500)",color:"var(--white)",boxShadow:"var(--shadow-brand)"},
  secondary:{background:"var(--navy-800)",color:"var(--white)"},
  outline:{background:"transparent",color:"var(--navy-800)",borderColor:"var(--navy-800)"},
  ghost:{background:"transparent",color:"var(--navy-800)"},
  whatsapp:{background:"var(--whatsapp)",color:"var(--white)"}
};
const hovers={primary:{background:"var(--orange-600)"},secondary:{background:"var(--navy-700)"},outline:{background:"var(--navy-50)"},ghost:{background:"var(--gray-100)"},whatsapp:{background:"var(--whatsapp-dark)"}};

export function Button({variant="primary",size="md",fullWidth=false,disabled=false,iconLeft,iconRight,as="button",href,children,style,onClick,...rest}){
  const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);
  const Tag=as==="a"?"a":"button";
  const s={...base,...sizes[size],...variants[variant],...(h&&!disabled?hovers[variant]:null),
    width:fullWidth?"100%":undefined,
    transform:disabled?undefined:p?"var(--press-scale)":h?"var(--lift-hover)":"none",
    opacity:disabled?.45:1,pointerEvents:disabled?"none":undefined,...style};
  return React.createElement(Tag,{href,onClick,disabled:Tag==="button"?disabled:undefined,style:s,
    onMouseEnter:()=>setH(true),onMouseLeave:()=>{setH(false);setP(false)},onMouseDown:()=>setP(true),onMouseUp:()=>setP(false),...rest},
    iconLeft,children,iconRight);
}

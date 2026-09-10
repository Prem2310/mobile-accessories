import React from "react";

const map={sale:{bg:"var(--orange-500)",fg:"var(--white)"},new:{bg:"var(--navy-800)",fg:"var(--white)"},
 stock:{bg:"var(--green-100)",fg:"var(--green-600)"},out:{bg:"var(--red-100)",fg:"var(--red-600)"},
 info:{bg:"var(--gray-100)",fg:"var(--gray-800)"},warn:{bg:"var(--amber-100)",fg:"var(--amber-600)"}};
export function Badge({tone="sale",children,style,...rest}){
  const t=map[tone]||map.info;
  return <span style={{display:"inline-flex",alignItems:"center",gap:"var(--sp-1)",background:t.bg,color:t.fg,
    font:"var(--type-label)",letterSpacing:"var(--ls-wide)",textTransform:"uppercase",padding:"5px 10px",
    borderRadius:"var(--radius-xs)",...style}} {...rest}>{children}</span>;
}

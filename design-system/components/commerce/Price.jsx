import React from "react";

export function Price({amount,mrp,size="md",style,...rest}){
  const fmt=n=>"₹"+Number(n).toLocaleString("en-IN");
  const fs={sm:"var(--fs-base)",md:"var(--fs-h3)",lg:"var(--fs-h2)"}[size];
  const off=mrp&&mrp>amount?Math.round((1-amount/mrp)*100):null;
  return <span style={{display:"inline-flex",alignItems:"baseline",gap:"var(--sp-2)",...style}} {...rest}>
    <span style={{font:"var(--fw-bold) "+fs+"/1.1 var(--font-body)",color:"var(--price)"}}>{fmt(amount)}</span>
    {mrp&&<span style={{font:"var(--fw-medium) var(--fs-sm)/1 var(--font-body)",color:"var(--price-strike)",textDecoration:"line-through"}}>{fmt(mrp)}</span>}
    {off&&<span style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"var(--save)"}}>{off}% off</span>}
  </span>;
}

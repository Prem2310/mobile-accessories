const {Card,Price,Button,Input,Select,QuantityStepper,Icon,Badge,WhatsAppCTA,Checkbox,SectionHeading}=window.RaghavMobileAccessoriesDesignSystem_092910;

function CartScreen({items,setItems,onNav}){
 const [mode,setMode]=React.useState("delivery");
 const [done,setDone]=React.useState(false);
 const sub=items.reduce((s,i)=>s+i.price*i.qty,0);
 const ship=mode==="pickup"||sub>=499?0:40;
 if(done) return <div style={{maxWidth:640,margin:"0 auto",padding:"var(--sp-16) var(--gutter)"}}>
  <Card padding="var(--sp-10)" style={{textAlign:"center"}}>
   <span style={{display:"grid",placeItems:"center",width:64,height:64,borderRadius:999,background:"var(--green-100)",color:"var(--green-600)",margin:"0 auto"}}><Icon name="check" size={30}/></span>
   <h1 style={{font:"var(--type-h1)",marginTop:20}}>Order placed</h1>
   <p style={{marginTop:10,font:"var(--type-body)",color:"var(--text-muted)"}}>We'll WhatsApp you in a few minutes to confirm. Order #RM-2481.</p>
   <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:24}}>
    <WhatsAppCTA label="Message the shop"/><Button variant="outline" onClick={()=>{setItems([]);setDone(false);onNav({screen:"home"})}}>Keep shopping</Button></div>
  </Card></div>;
 if(!items.length) return <div style={{maxWidth:640,margin:"0 auto",padding:"var(--sp-16) var(--gutter)",textAlign:"center"}}>
  <Card padding="var(--sp-10)"><h1 style={{font:"var(--type-h2)"}}>Your cart is empty</h1>
   <p style={{marginTop:8,font:"var(--type-body)",color:"var(--text-muted)"}}>Add a cover or a screen guard and it'll show up here.</p>
   <div style={{marginTop:20}}><Button onClick={()=>onNav({screen:"home"})}>Browse products</Button></div></Card></div>;
 return <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-8) var(--gutter) 0"}}>
  <SectionHeading eyebrow={items.length+" items"} title="Your cart"/>
  <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:"var(--sp-8)",alignItems:"start"}}>
   <div style={{display:"grid",gap:"var(--sp-4)"}}>
    {items.map(it=><Card key={it.id} padding="var(--sp-4)" style={{display:"flex",gap:"var(--sp-4)",alignItems:"center"}}>
      <div style={{width:88,height:88,borderRadius:"var(--radius-md)",background:"var(--surface-sunken)",display:"grid",placeItems:"center",
        font:"var(--fw-bold) 10px/1.3 var(--font-body)",color:"var(--text-faint)",textAlign:"center",flex:"0 0 auto"}}>Photo</div>
      <div style={{flex:1}}>
       <div style={{font:"var(--fw-bold) var(--fs-base)/1.3 var(--font-body)",color:"var(--text-strong)"}}>{it.title}</div>
       <div style={{font:"var(--fw-medium) var(--fs-xs)/1.3 var(--font-body)",color:"var(--text-muted)",margin:"4px 0 8px"}}>{it.subtitle} · Black</div>
       <Price amount={it.price} mrp={it.mrp} size="sm"/></div>
      <QuantityStepper value={it.qty} onChange={v=>setItems(items.map(x=>x.id===it.id?{...x,qty:v}:x))}/>
      <button aria-label="Remove" onClick={()=>setItems(items.filter(x=>x.id!==it.id))}
        style={{border:0,background:"transparent",cursor:"pointer",color:"var(--gray-400)",padding:8}}><Icon name="trash-2" size={18}/></button>
     </Card>)}
    <Card padding="var(--sp-5)" style={{display:"grid",gap:"var(--sp-4)"}}>
     <div style={{font:"var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",color:"var(--text-strong)"}}>How do you want it?</div>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[["delivery","Home delivery","Today, 6–9 pm"],["pickup","Store pickup","Ready in 10 min"]].map(([k,t,s])=>
       <button key={k} onClick={()=>setMode(k)} style={{textAlign:"left",padding:"14px 16px",borderRadius:"var(--radius-md)",cursor:"pointer",
         border:"1.5px solid "+(mode===k?"var(--orange-500)":"var(--border-default)"),background:mode===k?"var(--orange-50)":"var(--white)"}}>
        <div style={{font:"var(--fw-bold) var(--fs-base)/1 var(--font-body)",color:"var(--text-strong)"}}>{t}</div>
        <div style={{font:"var(--fw-medium) var(--fs-xs)/1 var(--font-body)",color:"var(--text-muted)",marginTop:6}}>{s}</div></button>)}</div>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Input label="Name" placeholder="Your name"/><Input label="WhatsApp number" placeholder="98xxxxxxxx"/>
      {mode==="delivery"&&<Input label="Address" placeholder="Flat, street, landmark" style={{gridColumn:"1 / -1"}}/>}
      <Select label="Payment" options={["Cash on delivery","UPI on delivery","Pay now via UPI"]}/></div>
    </Card>
   </div>
   <Card padding="var(--sp-5)" style={{position:"sticky",top:110,display:"grid",gap:"var(--sp-3)"}}>
    <div style={{font:"var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",color:"var(--text-strong)",marginBottom:4}}>Order summary</div>
    {[["Subtotal","₹"+sub.toLocaleString("en-IN")],[mode==="pickup"?"Store pickup":"Delivery",ship?"₹40":"Free"]].map(([l,v])=>
     <div key={l} style={{display:"flex",justifyContent:"space-between",font:"var(--type-body)",color:"var(--text-muted)"}}><span>{l}</span><span style={{color:"var(--text-strong)",fontWeight:600}}>{v}</span></div>)}
    <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid var(--border-subtle)",paddingTop:12,marginTop:6}}>
     <span style={{font:"var(--fw-bold) var(--fs-base)/1 var(--font-body)",color:"var(--text-strong)"}}>Total</span><Price amount={sub+ship}/></div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><Badge tone="stock">Saving ₹{items.reduce((s,i)=>s+((i.mrp||i.price)-i.price)*i.qty,0)}</Badge></div>
    <Button size="lg" fullWidth onClick={()=>setDone(true)} style={{marginTop:8}}>Place order</Button>
    <WhatsAppCTA label="Order on WhatsApp instead" style={{width:"100%",justifyContent:"center"}}/>
    <Checkbox label="Send order updates on WhatsApp" checked/>
   </Card>
  </div></div>;
}
Object.assign(window,{CartScreen});

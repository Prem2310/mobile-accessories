const {Breadcrumbs,Badge,Price,Rating,Button,Tabs,Tag,Card,Icon,QuantityStepper,WhatsAppCTA,ProductCard,SectionHeading}=window.RaghavMobileAccessoriesDesignSystem_092910;

function ProductScreen({id,onNav,onAdd}){
 const data=window.RM_DATA;
 const p=data.products.find(x=>x.id===id)||data.products[0];
 const [qty,setQty]=React.useState(1);
 const [tab,setTab]=React.useState("Details");
 const [shot,setShot]=React.useState(0);
 const body={Details:["Soft-touch matte finish that doesn't collect fingerprints.","Raised camera lip, 1.2mm shock-absorbing corners.","Precise cutouts — checked on the actual handset in store."],
  Compatibility:["Fits "+p.subtitle+" only.","Not compatible with the Plus / Max variants.","Works with MagSafe and wireless charging pads."],
  Reviews:["\"Fitted it at the shop in 2 minutes, no bubbles.\" — Jignesh P.","\"Colour is exactly like the photo.\" — Hetal S.","\"Cheaper than the mall price.\" — Mitesh D."]}[tab];
 return <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-6) var(--gutter) 0"}}>
  <Breadcrumbs items={[{label:"Home",href:"#"},{label:"Cases & Covers",href:"#"},p.title]}/>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--sp-10)",marginTop:"var(--sp-6)"}}>
   <div style={{display:"grid",gridTemplateColumns:"72px 1fr",gap:"var(--sp-4)"}}>
    <div style={{display:"grid",gap:10,alignContent:"start"}}>{[0,1,2,3].map(i=>
      <button key={i} onClick={()=>setShot(i)} style={{aspectRatio:"1/1",borderRadius:"var(--radius-md)",background:"var(--surface-sunken)",
        border:"1.5px solid "+(shot===i?"var(--orange-500)":"var(--border-subtle)"),cursor:"pointer",font:"var(--fw-bold) 10px/1 var(--font-body)",color:"var(--text-faint)"}}>{i+1}</button>)}</div>
    <div style={{aspectRatio:"1/1",borderRadius:"var(--radius-lg)",background:"var(--surface-sunken)",display:"grid",placeItems:"center",
      border:"1px solid var(--border-subtle)",position:"relative"}}>
     <span style={{position:"absolute",top:16,left:16}}><Badge>{p.badge?p.badge.label:"In stock"}</Badge></span>
     <span style={{font:"var(--fw-bold) var(--fs-sm)/1.5 var(--font-body)",color:"var(--text-faint)",textAlign:"center"}}>Product photo {shot+1}<br/><span style={{fontWeight:500}}>square, white background</span></span></div>
   </div>
   <div>
    <h1 style={{font:"var(--type-h1)",color:"var(--text-strong)"}}>{p.title}</h1>
    <div style={{display:"flex",alignItems:"center",gap:14,marginTop:10}}><Rating value={p.rating} count={p.reviews}/>
     <span style={{font:"var(--fw-medium) var(--fs-sm)/1 var(--font-body)",color:"var(--text-muted)"}}>{p.subtitle}</span></div>
    <div style={{marginTop:18}}><Price amount={p.price} mrp={p.mrp} size="lg"/></div>
    <div style={{font:"var(--fw-medium) var(--fs-xs)/1 var(--font-body)",color:"var(--text-muted)",marginTop:6}}>Inclusive of all taxes</div>
    <div style={{marginTop:22}}><div style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"var(--text-strong)",marginBottom:10}}>Colour</div>
     <div style={{display:"flex",gap:8}}>{["Black","Navy","Sand","Clear"].map((c,i)=><Tag key={c} selected={i===0}>{c}</Tag>)}</div></div>
    <div style={{display:"flex",gap:12,alignItems:"center",marginTop:24,flexWrap:"wrap"}}>
     <QuantityStepper value={qty} onChange={setQty}/>
     <Button size="lg" iconLeft={<Icon name="shopping-bag" size={18}/>} onClick={()=>{onAdd(p,qty);onNav({screen:"cart"})}}>Add to cart</Button>
     <WhatsAppCTA message={"Hi! I want the "+p.title+" ("+p.subtitle+")."}/></div>
    <Card padding="var(--sp-4)" style={{marginTop:22,display:"grid",gap:10}}>
     {[["store","Available at Vastral store today — collect in 10 min"],["truck","Free delivery in Vastral · ₹40 elsewhere in Ahmedabad"],["shield-check","7-day replacement if it doesn't fit"]].map(([i,t])=>
      <span key={t} style={{display:"flex",alignItems:"center",gap:10,font:"var(--fw-semibold) var(--fs-sm)/1.3 var(--font-body)",color:"var(--text-body)"}}>
       <Icon name={i} size={17} color="var(--orange-500)"/>{t}</span>)}</Card>
    <div style={{marginTop:26}}><Tabs items={["Details","Compatibility","Reviews"]} value={tab} onChange={setTab}/>
     <ul style={{margin:"16px 0 0",paddingLeft:18,display:"grid",gap:8,font:"var(--type-body)",color:"var(--text-body)"}}>
      {body.map(l=><li key={l}>{l}</li>)}</ul></div>
   </div>
  </div>
  <div style={{marginTop:"var(--sp-16)"}}><SectionHeading eyebrow="Goes well with" title="Customers also bought"/>
   <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"var(--sp-5)"}}>
    {data.products.filter(x=>x.id!==p.id).slice(0,4).map(x=><ProductCard key={x.id} {...x} onAdd={()=>onAdd(x)} onClick={()=>onNav({screen:"product",id:x.id})}/>)}</div></div>
 </div>;
}
Object.assign(window,{ProductScreen});

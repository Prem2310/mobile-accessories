const {Breadcrumbs,SectionHeading,ProductCard,Checkbox,Select,Tag,Card,Icon,Button}=window.RaghavMobileAccessoriesDesignSystem_092910;

function CategoryScreen({cat,onNav,onAdd}){
 const data=window.RM_DATA;
 const meta=data.categories.find(c=>c.id===cat)||data.categories[0];
 const [brand,setBrand]=React.useState("iPhone");
 const list=data.products.filter(p=>p.cat===meta.id);
 const grid=list.length?list:data.products;
 return <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-6) var(--gutter) 0"}}>
  <Breadcrumbs items={[{label:"Home",href:"#"},meta.label]}/>
  <SectionHeading style={{marginTop:"var(--sp-5)"}} eyebrow={meta.count+" products"} title={meta.label}
   action={<Select options={["Sort: Popular","Price: low to high","Price: high to low","Newest"]} style={{width:220}}/>}/>
  <div style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:"var(--sp-8)",alignItems:"start"}}>
   <Card padding="var(--sp-5)" style={{position:"sticky",top:110,display:"grid",gap:"var(--sp-5)"}}>
    <div><div style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"var(--text-strong)",marginBottom:12,letterSpacing:"var(--ls-wide)",textTransform:"uppercase"}}>Phone brand</div>
     <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{data.brands.slice(0,6).map(b=><Tag key={b} selected={b===brand} onClick={()=>setBrand(b)}>{b}</Tag>)}</div></div>
    <div style={{borderTop:"1px solid var(--border-subtle)",paddingTop:"var(--sp-4)"}}>
     <div style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"var(--text-strong)",marginBottom:6,letterSpacing:"var(--ls-wide)",textTransform:"uppercase"}}>Type</div>
     {data.categories.slice(0,4).map((c,i)=><Checkbox key={c.id} label={c.label} count={c.count} checked={c.id===meta.id}/>)}</div>
    <div style={{borderTop:"1px solid var(--border-subtle)",paddingTop:"var(--sp-4)"}}>
     <div style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"var(--text-strong)",marginBottom:6,letterSpacing:"var(--ls-wide)",textTransform:"uppercase"}}>Price</div>
     {["Under ₹200","₹200 – ₹500","₹500 – ₹1000","Above ₹1000"].map(p=><Checkbox key={p} label={p}/>)}</div>
    <div style={{borderTop:"1px solid var(--border-subtle)",paddingTop:"var(--sp-4)"}}>
     <Checkbox label="In stock at Vastral store" checked/><Checkbox label="Free fitting included"/></div>
   </Card>
   <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--sp-5)"}}>
     {grid.concat(grid).slice(0,9).map((x,i)=><ProductCard key={i} {...x} onAdd={()=>onAdd(x)} onClick={()=>onNav({screen:"product",id:x.id})}/>)}</div>
    <div style={{display:"flex",justifyContent:"center",marginTop:"var(--sp-8)"}}><Button variant="outline" iconRight={<Icon name="chevron-down" size={18}/>}>Load more</Button></div>
   </div>
  </div></div>;
}
Object.assign(window,{CategoryScreen});

const {Button,Icon,Card,SectionHeading,ProductCard,OfferBanner,Tag,Badge,WhatsAppCTA}=window.RaghavMobileAccessoriesDesignSystem_092910;

function Hero({onNav}){
 return <div style={{background:"var(--surface-dark)",color:"#fff"}}>
  <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-16) var(--gutter)",display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:"var(--sp-10)",alignItems:"center"}}>
   <div>
    <span style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",borderRadius:999,background:"rgba(242,106,0,.16)",
      color:"var(--orange-400)",font:"var(--type-label)",letterSpacing:"var(--ls-caps)",textTransform:"uppercase"}}>
      <Icon name="store" size={13}/>Vastral's accessory shop, now online</span>
    <h1 style={{font:"var(--type-display)",color:"#fff",margin:"18px 0 0",maxWidth:520}}>Covers that actually fit your phone.</h1>
    <p style={{marginTop:14,font:"var(--fw-medium) var(--fs-lg)/1.55 var(--font-body)",color:"var(--navy-200)",maxWidth:460}}>
     Pick your model, see what's in stock today, and collect it in 10 minutes — or get it delivered free across Vastral.</p>
    <div style={{display:"flex",gap:12,marginTop:26,flexWrap:"wrap"}}>
     <Button size="lg" iconRight={<Icon name="arrow-right" size={18}/>} onClick={()=>onNav({screen:"category",cat:"covers"})}>Shop by model</Button>
     <WhatsAppCTA label="Ask on WhatsApp"/></div>
    <div style={{display:"flex",gap:26,marginTop:32,flexWrap:"wrap"}}>
     {[["shield-check","7-day replacement"],["truck","Free local delivery"],["hand-coins","Cash on delivery"]].map(([i,t])=>
      <span key={t} style={{display:"inline-flex",alignItems:"center",gap:8,font:"var(--fw-semibold) var(--fs-sm)/1 var(--font-body)",color:"var(--navy-200)"}}><Icon name={i} size={16} color="var(--orange-400)"/>{t}</span>)}
    </div>
   </div>
   <div style={{aspectRatio:"4/3",borderRadius:"var(--radius-xl)",background:"rgba(255,255,255,.06)",border:"1.5px dashed rgba(255,255,255,.22)",
     display:"grid",placeItems:"center",textAlign:"center",padding:24}}>
    <span style={{font:"var(--fw-bold) var(--fs-sm)/1.5 var(--font-body)",color:"var(--navy-200)"}}>Hero photo slot<br/><span style={{fontWeight:500}}>shelf wall / product flat-lay from the shop</span></span></div>
  </div></div>;
}

function CategoryTiles({onNav}){
 return <Section><SectionHeading eyebrow="Browse" title="What are you looking for?"/>
  <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"var(--sp-4)"}}>
   {window.RM_DATA.categories.map(c=>
    <button key={c.id} onClick={()=>onNav({screen:"category",cat:c.id})} style={{border:"1px solid var(--border-subtle)",background:"var(--surface-card)",
      borderRadius:"var(--radius-lg)",padding:"var(--sp-5) var(--sp-3)",cursor:"pointer",display:"grid",gap:10,justifyItems:"center",boxShadow:"var(--shadow-card)"}}>
     <span style={{width:46,height:46,borderRadius:999,background:"var(--orange-50)",display:"grid",placeItems:"center",color:"var(--orange-600)"}}><Icon name={c.icon} size={22}/></span>
     <span style={{font:"var(--fw-bold) var(--fs-sm)/1.3 var(--font-body)",color:"var(--text-strong)",textAlign:"center"}}>{c.label}</span>
     <span style={{font:"var(--fw-medium) var(--fs-xs)/1 var(--font-mono)",color:"var(--text-faint)"}}>{c.count} items</span>
    </button>)}
  </div></Section>;
}

function ModelPicker(){
 const [b,setB]=React.useState("iPhone");
 return <Section><Card padding="var(--sp-6)" style={{display:"flex",alignItems:"center",gap:"var(--sp-6)",flexWrap:"wrap"}}>
   <div style={{minWidth:220}}><div style={{font:"var(--fw-bold) var(--fs-h3)/1.2 var(--font-display)",color:"var(--text-strong)"}}>Find by phone model</div>
    <div style={{font:"var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)",color:"var(--text-muted)",marginTop:4}}>Only exact-fit products are shown.</div></div>
   <div style={{display:"flex",gap:8,flexWrap:"wrap",flex:1}}>{window.RM_DATA.brands.map(x=><Tag key={x} selected={x===b} onClick={()=>setB(x)}>{x}</Tag>)}</div>
  </Card></Section>;
}

function HomeScreen({onNav,onAdd}){
 const p=window.RM_DATA.products;
 return <div>
  <Hero onNav={onNav}/>
  <CategoryTiles onNav={onNav}/>
  <ModelPicker/>
  <Section><SectionHeading eyebrow="Fast movers" title="Popular this week"
    action={<Button variant="ghost" size="sm" iconRight={<Icon name="arrow-right" size={16}/>} onClick={()=>onNav({screen:"category",cat:"covers"})}>View all</Button>}/>
   <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"var(--sp-5)"}}>
    {p.slice(0,4).map(x=><ProductCard key={x.id} {...x} onAdd={()=>onAdd(x)} onClick={()=>onNav({screen:"product",id:x.id})}/>)}</div></Section>
  <Section><OfferBanner title="Free screen-guard fitting, every day" subtitle="Buy any tempered glass and we fit it in store — bubble-free or we replace it."
    cta={<Button iconRight={<Icon name="map-pin" size={18}/>}>Get directions</Button>}/></Section>
  <Section><SectionHeading eyebrow="Just in" title="New arrivals"/>
   <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"var(--sp-5)"}}>
    {p.slice(4).map(x=><ProductCard key={x.id} {...x} onAdd={()=>onAdd(x)} onClick={()=>onNav({screen:"product",id:x.id})}/>)}</div></Section>
  <Section><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--sp-5)"}}>
    {[["instagram","Seen it on Instagram?","Send us the reel or post — we'll tell you the price and if it's in stock."],
      ["wrench","Repairs & fitting","Screen guard fitting, cover cutting and charging-port cleaning at the counter."],
      ["users","Bulk & dealer rates","Buying 20+ pieces for your shop? Ask for the wholesale list on WhatsApp."]].map(([i,t,d])=>
     <Card key={t} interactive><span style={{display:"grid",placeItems:"center",width:44,height:44,borderRadius:999,background:"var(--navy-50)",color:"var(--navy-800)"}}><Icon name={i}/></span>
      <div style={{font:"var(--fw-bold) var(--fs-h3)/1.2 var(--font-body)",color:"var(--text-strong)",margin:"14px 0 6px"}}>{t}</div>
      <p style={{font:"var(--type-body)",color:"var(--text-muted)"}}>{d}</p></Card>)}
   </div></Section>
 </div>;
}
Object.assign(window,{HomeScreen});

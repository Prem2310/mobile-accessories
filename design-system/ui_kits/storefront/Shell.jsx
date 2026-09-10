const {Button,IconButton,Icon,SearchBar,Badge}=window.RaghavMobileAccessoriesDesignSystem_092910;

function TopStrip(){const d=window.RM_DATA.shop;
 return <div style={{background:"var(--navy-900)",color:"var(--navy-200)",font:"var(--fw-medium) var(--fs-xs)/1 var(--font-body)"}}>
  <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"9px var(--gutter)",display:"flex",justifyContent:"space-between",gap:16}}>
   <span style={{display:"inline-flex",alignItems:"center",gap:8}}><Icon name="map-pin" size={13}/>{d.area} · {d.hours}</span>
   <span style={{display:"inline-flex",alignItems:"center",gap:20}}>
    <span style={{display:"inline-flex",alignItems:"center",gap:6}}><Icon name="truck" size={13}/>Free delivery in Vastral over ₹499</span>
    <span style={{display:"inline-flex",alignItems:"center",gap:6}}><Icon name="instagram" size={13}/>{d.insta}</span></span>
  </div></div>;
}

function Header({cartCount,onNav,active}){
 const links=[["home","Home"],["covers","Cases & Covers"],["glass","Screen Guards"],["chargers","Charging"],["audio","Audio"]];
 return <header style={{position:"sticky",top:0,zIndex:20,background:"var(--surface-dark)",boxShadow:"var(--shadow-sticky)"}}>
  <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-4) var(--gutter)",display:"flex",alignItems:"center",gap:"var(--sp-6)"}}>
   <button onClick={()=>onNav({screen:"home"})} style={{border:0,background:"transparent",cursor:"pointer",padding:0,textAlign:"left"}}>
    <div style={{font:"800 26px/1 var(--font-display)",color:"#fff",letterSpacing:"-.02em"}}>Ragh<span style={{color:"var(--orange-500)"}}>a</span>v</div>
    <div style={{font:"var(--fw-bold) 9px/1 var(--font-body)",letterSpacing:"var(--ls-caps)",color:"var(--navy-200)",textTransform:"uppercase",marginTop:4}}>Mobile Accessories</div>
   </button>
   <div style={{flex:1,maxWidth:440}}><SearchBar placeholder="Search by phone model…"/></div>
   <nav style={{display:"flex",gap:"var(--sp-5)",marginLeft:"auto"}}>
    {links.map(([id,l])=><button key={id} onClick={()=>onNav(id==="home"?{screen:"home"}:{screen:"category",cat:id})}
      style={{border:0,background:"transparent",cursor:"pointer",font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",
      color:active===id?"var(--orange-400)":"var(--navy-200)",padding:"8px 0"}}>{l}</button>)}
   </nav>
   <div style={{display:"flex",alignItems:"center",gap:4}}>
    <IconButton label="Wishlist" tone="onDark"><Icon name="heart"/></IconButton>
    <span style={{position:"relative"}}>
     <IconButton label="Cart" tone="onDark" onClick={()=>onNav({screen:"cart"})}><Icon name="shopping-bag"/></IconButton>
     {cartCount>0&&<span style={{position:"absolute",top:2,right:0,minWidth:18,height:18,borderRadius:999,background:"var(--orange-500)",
       color:"#fff",font:"var(--fw-bold) 10px/18px var(--font-body)",textAlign:"center",padding:"0 4px"}}>{cartCount}</span>}
    </span>
   </div>
  </div></header>;
}

function Footer(){const d=window.RM_DATA.shop;
 const col=(t,items)=><div><div style={{font:"var(--fw-bold) var(--fs-sm)/1 var(--font-body)",color:"#fff",marginBottom:14}}>{t}</div>
  <div style={{display:"grid",gap:10}}>{items.map(i=><span key={i} style={{font:"var(--fw-medium) var(--fs-sm)/1.4 var(--font-body)",color:"var(--navy-200)"}}>{i}</span>)}</div></div>;
 return <footer style={{background:"var(--navy-900)",marginTop:"var(--sp-20)"}}>
  <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-12) var(--gutter)",display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:"var(--sp-8)"}}>
   <div>
    <div style={{font:"800 24px/1 var(--font-display)",color:"#fff"}}>Ragh<span style={{color:"var(--orange-500)"}}>a</span>v</div>
    <p style={{marginTop:12,font:"var(--fw-medium) var(--fs-sm)/1.6 var(--font-body)",color:"var(--navy-200)",maxWidth:280}}>
     Your neighbourhood mobile accessories shop in {d.area}. Covers, glass, chargers and more — fitted free in store.</p>
    <div style={{display:"flex",gap:10,marginTop:16}}>
     <a href="#" style={{display:"grid",placeItems:"center",width:38,height:38,borderRadius:999,background:"rgba(255,255,255,.1)",color:"#fff"}}><Icon name="instagram" size={18}/></a>
     <a href="#" style={{display:"grid",placeItems:"center",width:38,height:38,borderRadius:999,background:"rgba(255,255,255,.1)",color:"#fff"}}><Icon name="message-circle" size={18}/></a>
     <a href="#" style={{display:"grid",placeItems:"center",width:38,height:38,borderRadius:999,background:"rgba(255,255,255,.1)",color:"#fff"}}><Icon name="phone" size={18}/></a></div>
   </div>
   {col("Shop",["Back covers","Tempered glass","Chargers","Cables","Earbuds"])}
   {col("Help",["Track my order","Fitting & warranty","Returns in 7 days","Bulk / dealer rates"])}
   {col("Visit us",[d.area,d.hours,"+91 99999 99999"])}
  </div>
  <div style={{borderTop:"1px solid rgba(255,255,255,.12)"}}>
   <div style={{maxWidth:"var(--container)",margin:"0 auto",padding:"16px var(--gutter)",font:"var(--fw-medium) var(--fs-xs)/1 var(--font-body)",color:"var(--navy-200)",display:"flex",justifyContent:"space-between"}}>
    <span>© 2026 Raghav Mobile Accessories</span><span>GST 24XXXXX1234X1ZX · Made in Ahmedabad</span></div></div>
 </footer>;
}

function Section({children,style}){return <section style={{maxWidth:"var(--container)",margin:"0 auto",padding:"var(--sp-12) var(--gutter) 0",...style}}>{children}</section>;}
Object.assign(window,{TopStrip,Header,Footer,Section});

import { useState } from 'react'
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Icon,
  IconButton,
  Input,
  OfferBanner,
  Price,
  ProductCard,
  QuantityStepper,
  Rating,
  SearchBar,
  SectionHeading,
  Select,
  Tabs,
  Tag,
  WhatsAppCTA,
} from './components/ds'

function App() {
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('cases')
  const [tag, setTag] = useState(false)

  return (
    <div className="container-page py-16" style={{ display: 'grid', gap: 'var(--sp-8)' }}>
      <SectionHeading eyebrow="Design system smoke test" title="Raghav Mobile Accessories" />
      <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Phone Cases', href: '#' }, 'Matte Silicone Case']} />

      <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <Button>Order on WhatsApp isn't this one</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="whatsapp" iconLeft={<Icon name="message-circle" size={18} />}>WhatsApp</Button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge tone="sale">50% off</Badge>
        <Badge tone="new">Just in</Badge>
        <Badge tone="stock">In stock</Badge>
        <Badge tone="out">Out of stock</Badge>
        <Rating value={4.6} count={128} />
        <Price amount={449} mrp={699} />
        <Tag selected={tag} onClick={() => setTag((t) => !t)}>
          iPhone 15
        </Tag>
        <QuantityStepper value={qty} onChange={setQty} />
        <IconButton label="Wishlist" tone="brand">
          <Icon name="heart" size={18} />
        </IconButton>
      </div>

      <SearchBar placeholder="Search covers, glass, chargers…" />
      <Input label="Mobile number" placeholder="98765 43210" />
      <Select label="Compatibility" options={['iPhone 15', 'iPhone 15 Pro', 'Samsung S24']} />
      <Checkbox label="Free delivery only" checked count={12} />

      <Tabs items={[{ value: 'cases', label: 'Cases' }, { value: 'glass', label: 'Screen guards' }]} value={tab} onChange={setTab} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
        <ProductCard title="Matte Silicone Case — shock corners" subtitle="iPhone 15" price={449} mrp={699} rating={4.6} reviews={128} badge={{ label: '35% off' }} />
        <Card interactive>
          <div style={{ font: 'var(--type-h3)', color: 'var(--text-strong)' }}>Card component</div>
          <p style={{ marginTop: 'var(--sp-2)', color: 'var(--text-muted)' }}>Hover to lift.</p>
        </Card>
      </div>

      <OfferBanner title="Free screen-guard fitting, every day" subtitle="Bring your phone to the Vastral store." cta={<Button variant="primary">Get directions</Button>} />

      <WhatsAppCTA floating message="Hi Raghav Mobile Accessories, I want to order: Matte Silicone Case (iPhone 15)" />
    </div>
  )
}

export default App

One-line: the shop's action control — an orange pill for anything that moves a sale forward, navy for secondary, green for "Order on WhatsApp".

```jsx
<Button variant="primary" size="lg" iconLeft={<Icon name="shopping-bag" />}>Add to cart</Button>
<Button variant="whatsapp">Order on WhatsApp</Button>
<Button variant="outline" size="sm">View all</Button>
```

Variants: primary | secondary | outline | ghost | whatsapp. Sizes sm/md/lg (44px is the default tap target). Always pill-shaped — never square a button.

## Commands

npm run dev # dev
npm run build # prod
npm run lint # lint

No tests.

## Architecture

Barril Market = Next.js 15 shop.
App Router. TypeScript strict.
Alias @/* → root.

## Design System

Dark VIP theme. All new components must use these tokens:
- bg page: #080808
- surface/cards: #111111
- nav: #0D0D0D
- gold accent: #C9A84C, hover: #B8973D
- text primary: #F5F0E8
- text muted: #9A8C7A
- border subtle: #C9A84C/10–40, #1E1E1E

Fonts: Inter (body) + Playfair Display (headings/prices).
CSS vars: --font-inter, --font-playfair, --color-primary, --background.
Tailwind v4 — use bg-linear-to-r NOT bg-gradient-to-r.

## API Layer (`/lib/api.ts`)

All fetch here. URL = NEXT_PUBLIC_API_URL.
Returns ApiResponse<T>.
Use ?include= for relations.

Functions:
- getProductVariants() — all variants with product
- getProducts() — all products with media
- getCategories() — all categories
- getRegions() — all regions
- getProductVariantsByCategory(categoryId) — variants filtered by category
- getProductVariantsByRegion(regionId) — variants for a region
- getProductVariantsByProductId(productId) — all variants of one product (includes brand + media)

CORS: browser cannot call the external API directly.
Use Next.js API route proxies for client-side fetches:
- /api/product-variants → proxies /product-variants?include=product (revalidate 300s)
- /api/categories → proxies /categories (revalidate 3600s)

## Routing (`/app`)

### Pages

| Route | File | Description |
|---|---|---|
| / | app/page.tsx | Homepage (client). Hero, trust bar, featured banners, regions grid, categories grid, featured products, latest products from API, CTA, footer. |
| /region/[region] | app/region/[region]/page.tsx | Product list by region. Server component. Uses ProductListView. |
| /products/[category] | app/products/[category]/page.tsx | Product detail — single-segment URL (e.g. /products/123). Param `category` holds the product ID. |
| /products/[category]/[productId] | app/products/[category]/[productId]/page.tsx | Product detail — two-segment URL (e.g. /products/bogota/123). `category` = region or category slug, `productId` = product ID. |

### Route notes

- /products/[category] and /products/[category]/[productId] both render the same product detail UI (Header + ProductGallery + ProductInfo).
- Homepage links go to /products/{variant.product_id} (single-segment).
- ProductListView links go to /products/{regionSlug}/{variant.product_id} (two-segment).
- Region slugs are generated with toSlug(): lowercase, NFD normalize, strip accents, spaces → hyphens.

### API Routes (proxies)

| Route | File |
|---|---|
| /api/product-variants | app/api/product-variants/route.ts |
| /api/categories | app/api/categories/route.ts |

## State Management (`/store/cartStore.ts`)

Zustand + persist → localStorage key: barril-cart.

CartItem: { variantId, productId, name, presentation, price, image, quantity }

Actions: addItem(Omit<CartItem,"quantity">), removeItem(variantId), updateQuantity(variantId, qty), clearCart
Computed: totalItems(), totalPrice()
UI: isOpen, openCart(), closeCart(), toggleCart()

addItem maps variant fields explicitly — never pass a ProductVariant directly:
```ts
addItem({ variantId: v.id, productId: v.product_id, name: v.product?.name ?? "", presentation: v.presentation, price: v.final_price, image: v.primary_image?.url ?? null })
```

## Components

### Shared

| Component | Description |
|---|---|
| components/Header.jsx | Main dark header. Sticky, logo left, search center, gold cart button, nav with gold hover underline, mobile drawer. Uses useCartStore (toggleCart, totalItems). |
| components/FeaturedBanners.jsx | Dark carousel with gold accents. |
| components/ProductListView.tsx | Client component. Full product list with sidebar filters (price range, stock, sale, brand), sort, search, pagination, mobile filter drawer. Props: variants, regionName, regionSlug. |
| components/cart/CartDrawer.tsx | Slide-in cart drawer. |
| components/cart/CartItem.tsx | Single cart item row. |

### Product detail

| Component | Description |
|---|---|
| components/product/ProductGallery.tsx | Image gallery with thumbnails. Dark theme. |
| components/product/ProductInfo.tsx | Variant selector, qty, add-to-cart (gold CTA with added state), trust badges, SKU. |
| components/product/VariantSelector.tsx | Pill buttons, gold active state, strikethrough for out-of-stock. |
| components/product/QtyControl.tsx | Dark +/− qty control. |

### Legacy (not used in new pages)

HeaderCategories.tsx, ProductList.tsx, FilterBrand.tsx, FilterStatus.tsx, PriceRange.tsx, SearchBar.tsx, CategoryTitle.tsx, Breadcrumb.tsx

## Images

Allow thebarrilmarket.com in next.config.
Use plain <img> tags (not next/image) for external product images — do not add unoptimized prop to <img>.
next/image is used only in CartItem (unoptimized: true).

## Styling

Tailwind v4.
No bg-gradient-to-r → use bg-linear-to-r.
No flex-shrink-0 → use shrink-0.
No max-w-[200px] style → use Tailwind scale (max-w-50).

## Payments — Wompi MCP Server

MCP server `wompi-docs` is configured globally and available in all sessions.
Server path: `C:/Users/Webmaster/.claude/mcp-servers/wompi-docs/index.js`

### Tools

| Tool | Description |
|---|---|
| `list_wompi_sections` | Lists all available doc sections (no args) |
| `get_wompi_docs` | Fetches a full doc page — pass `section` key (e.g. `"inicio-rapido"`) |
| `search_wompi_docs` | Searches across sections — pass `query` string and optional `sections` array |

### Available sections

`inicio-rapido`, `autenticacion`, `transacciones`, `metodos-de-pago`, `tarjeta-de-credito`, `pse`, `nequi`, `daviplata`, `bancolombia-qr`, `efecty`, `corresponsales`, `link-de-pago`, `eventos`, `tokenizacion`, `split`, `integridad`, `ambientes`, `referencias`

### When to use

- Any Wompi API integration, webhook setup, or payment flow question → use `get_wompi_docs` first.
- Unknown endpoint or parameter → `search_wompi_docs` with the keyword.
- Always fetch fresh docs before writing Wompi integration code — do NOT rely on training data.

## Commands

npm run dev # dev
npm run build # prod
npm run lint # lint

No tests.

## Architecture

Barril Market = Next.js 15 shop.
App Router. TypeScript strict.
Alias @/\* → root.

### API Layer (`/lib/api.ts`)

All fetch here.
URL = NEXT_PUBLIC_API_URL.
Return ApiResponse<T>.
Use ?include= for relations.
Resources:
products, product-variants, categories, regions.

### Routing (`/app`)

App Router.
/products/[category] → list by category
/products/[category]/[productId] → product detail
/region/[region] → list by region

### State Management (`/store/cartStore.ts`)

Zustand + persist → localStorage barril-cart.
Actions:
addItem, removeItem, updateQuantity, clearCart
Computed:
totalItems(), totalPrice()
Cart = ProductVariant.

### Components

components/ = shared UI
components/cart/ = cart

Flow:
ProductList → ProductItem

Extras:
ProductCarousel = scroll
Breadcrumb, Accordion = layout

### Images

Allow thebarrilmarket.com
No optimization (unoptimized: true)

### Styling

Tailwind v4

Category colors → tailwind.category.config.ts
Apply per route.

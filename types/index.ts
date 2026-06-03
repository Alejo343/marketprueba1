export interface Media {
  id: number;
  url: string;
  alt: string;
  pivot?: {
    is_primary: boolean;
    order: number;
  };
}

export interface Brand {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  presentation: string;
  sku: string;
  barcode: string | null;
  price: number;
  sale_price: number | null;
  final_price: number;
  has_sale: boolean;
  stock: number;
  min_stock: number;
  low_stock: boolean;
  in_stock: boolean;
  is_featured: boolean;
  featured_order: number | null;
  primary_image: Media | null;
  product: Pick<
    Product,
    | "id"
    | "name"
    | "description"
    | "sale_type"
    | "sale_type_label"
    | "brand"
    | "media"
    | "region_id"
  >;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sale_type: string;
  sale_type_label: string;
  active: boolean;
  category_id: number;
  region_id?: number | null;
  brand_id: number | null;
  brand?: Brand | null;
  primary_image: Media | null;
  has_images: boolean;
  media: Media[];
  variants: ProductVariant[];
}

export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T[];
}

export interface FeaturedProductVariant {
  id: number;
  product_id: number;
  presentation: string;
  sku: string;
  barcode: string | null;
  price: number;
  sale_price: number | null;
  final_price: number;
  has_sale: boolean;
  stock: number;
  min_stock: number;
  low_stock: boolean;
  in_stock: boolean;
}

export interface FeaturedProduct {
  id: number;
  name: string;
  sale_type: string;
  sale_type_label?: string;
  active: boolean;
  category?: { id: number; name: string } | null;
  brand?: Brand | null;
  primary_image: Media | null;
  variants?: FeaturedProductVariant[];
}

export interface Region {
  id: number;
  parent_id: number | null;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

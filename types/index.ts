export interface Media {
  id: number;
  url: string;
  alt: string;
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
  primary_image: Media | null;
  product: Pick<
    Product,
    "id" | "name" | "description" | "sale_type_label" | "brand"
  >;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sale_type: string;
  sale_type_label: string;
  active: boolean;
  category_id: number;
  brand_id: number | null;
  brand?: Brand | null;
  primary_image: Media | null;
  has_images: boolean;
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

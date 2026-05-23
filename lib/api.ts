import {
  ApiResponse,
  ProductVariant,
  Product,
  Category,
  Region,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductVariants(): Promise<
  ApiResponse<ProductVariant>
> {
  const res = await fetch(`${BASE_URL}/product-variants?include=product`);
  if (!res.ok) throw new Error("Error al obtener variantes");
  return res.json();
}

export async function getProducts(): Promise<ApiResponse<Product>> {
  const res = await fetch(`${BASE_URL}/products?include=media`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function getCategories(): Promise<ApiResponse<Category>> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
}

export async function getProductVariantsByCategory(categoryId: number) {
  const res = await fetch(
    `${BASE_URL}/product-variants?include=product.brand,product.media&category_id=${categoryId}&per_page=500`,
  );
  if (!res.ok) throw new Error("Error al obtener variantes");
  return res.json();
}

export async function getRegions(): Promise<ApiResponse<Region>> {
  const res = await fetch(`${BASE_URL}/regions`);
  if (!res.ok) throw new Error("Error al obtener regiones");
  return res.json();
}

export async function getProductVariantsByRegion(regionId: number) {
  const res = await fetch(`${BASE_URL}/regions/${regionId}/variants?include=product.brand,product.media&per_page=500`);
  if (!res.ok) throw new Error("Error al obtener variantes por región");
  return res.json();
}

export async function getFeaturedVariants(regionId?: number): Promise<ProductVariant[]> {
  const url = regionId
    ? `/api/featured-variants?region_id=${regionId}`
    : `/api/featured-variants`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener variantes destacadas");
  const json = await res.json();
  return json.data ?? [];
}

// Obtiene todas las variantes de un producto por su ID
// Incluye brand y media para la página de detalle
export async function getProductVariantsByProductId(
  productId: number,
): Promise<ApiResponse<ProductVariant>> {
  const res = await fetch(
    `${BASE_URL}/product-variants?include=product.brand,product.media&product_id=${productId}`,
  );
  if (!res.ok) throw new Error("Error al obtener variantes del producto");
  return res.json();
}

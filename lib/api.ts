import { Product, ProductsResponse } from "@/lib/types";

const BASE_URL = "https://dummyjson.com";

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getAllProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

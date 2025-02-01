import { productsApi } from "../api/productsApi";
import { Product } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterUrl = filterKey ? `?category=${filterKey}` : "";

  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);
  return data;
};

interface GetProductOptions {
  id?: string;
}

export const getProduct = async ({
  id,
}: GetProductOptions): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};

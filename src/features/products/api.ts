import { Product } from "./types";

export async function fetchProductsPage(
  page: number,
  limit: number,
  search: string
): Promise<{ data: Product[]; total: number; totalPages?: number }> {
  const res = await fetch(
    `/api/products/page?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}`
  );
  if (!res.ok) throw new Error("Ошибка при загрузке продуктов");
  try {
    return await res.json();
  } catch {
    return { data: [], total: 0 };
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`/api/products/${id}`);

  if (res.status === 404) {
    return null; // Сущность не найдена
  }

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке продукта: ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    throw new Error("Неверный формат ответа от сервера");
  }
}

export async function createProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const res = await fetch(`/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Ошибка при создании продукта");
  }

  return await res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка при удалении продукта");
  }
}

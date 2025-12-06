import { Product } from "../products/types"
import { Meal, MealFormData } from "./types";

// Получить первые N продуктов
export async function fetchFirstSelectProducts(limit = 20): Promise<Product[]> {
  const res = await fetch(`/api/products/searchLimited?limit=${limit}`);
  if (!res.ok) throw new Error("Ошибка при загрузке продуктов");
  try {
    return await res.json();
  } catch {
    return [];
  }
}

// Поиск продуктов по имени
export async function searchSelectProducts(search: string, limit = 20): Promise<Product[]> {
  const res = await fetch(`/api/products/searchLimited?search=${encodeURIComponent(search)}&limit=${limit}`);
  if (!res.ok) throw new Error("Ошибка при поиске продуктов");
  try {
    return await res.json();
  } catch {
    return [];
  }
}

// Получить приёмы пищи за сегодня
export async function fetchTodayMeals(): Promise<Meal[]> {
  const res = await fetch("/api/meals/today");
  if (!res.ok) throw new Error("Ошибка при загрузке приёмов пищи");
  return res.json();
}

export async function fetchDayMeals(year: number, month: number, day: number): Promise<Meal[]> {
  const res = await fetch(`/api/meals/day?year=${year}&month=${month}&day=${day}`);
  if (!res.ok) throw new Error("Ошибка при загрузке приёмов пищи за день");
  try {
    return await res.json();
  } catch {
    return [];
  }
}

// Добавить новый приём пищи
export async function addMeal(data: MealFormData): Promise<Meal> {
  const res = await fetch("/api/meals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка при добавлении приёма пищи");
  return res.json();
}

// Удалить приём пищи
export async function deleteMeal(id: number): Promise<void> {
  const res = await fetch(`/api/meals/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) {
    throw new Error("Ошибка при удалении приёма пищи");
  }
}
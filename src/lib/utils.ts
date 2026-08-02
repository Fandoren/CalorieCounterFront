import { MealProduct } from "@/features/counter/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentLocalTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function calcTotalCalories(products: MealProduct[]) {
  return products.reduce((sum, p) => sum + (p.calories || 0), 0);
}

export function ccalToCalories(ccal: number | undefined) {
  if (!ccal) return 0;

  return Math.round(ccal * 100);
}

export function caloriesToCCal(cal: number | undefined) {
  if (!cal) return 0;

  return cal / 100;
}

export function calculateCalories(
  protein: number | undefined,
  fat: number | undefined,
  carbs: number | undefined,
) {
  let proteinVal = protein ? protein * 4 : 0;
  let fatVal = fat ? fat * 9 : 0;
  let carbsVal = carbs ? carbs * 4 : 0;

  return Math.round(proteinVal + fatVal + carbsVal);
}

import { useMemo } from "react";
import { Product } from "../products/types";

export function useCalories(
  baseProduct: Product | null,
  grams: number,
  manual: boolean,
  manualValue: number
) {
  return useMemo(() => {
    if (manual || !baseProduct || grams <= 0) return manualValue;

    const factor = grams / 100;

    // Рассчитываем калории из нутриентов продукта
    return Math.round(
      (baseProduct.protein * 4 + baseProduct.fat * 9 + baseProduct.carbs * 4) *
        factor
    );
  }, [baseProduct, grams, manual, manualValue]);
}

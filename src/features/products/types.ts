import * as z from "zod"

export interface Product {
  id: number
  name: string
  description?: string
  protein: number
  fat: number
  carbs: number
}

export const ProductFormSchema = z.object({
  name: z.string().min(2, "Название слишком короткое"),
  protein: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          const parsed = parseFloat(val.replace(",", "."));
          return isNaN(parsed) ? 0 : parsed;
        }
        return val ?? 0;
      },
      z.number().min(0)
    )
    .transform((val) => Math.round(val * 10) / 10),
  fat: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          const parsed = parseFloat(val.replace(",", "."));
          return isNaN(parsed) ? 0 : parsed;
        }
        return val ?? 0;
      },
      z.number().min(0)
    )
    .transform((val) => Math.round(val * 10) / 10),
  carbs: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          const parsed = parseFloat(val.replace(",", "."));
          return isNaN(parsed) ? 0 : parsed;
        }
        return val ?? 0;
      },
      z.number().min(0)
    )
    .transform((val) => Math.round(val * 10) / 10),
});

export type ProductFormValues = z.infer<typeof ProductFormSchema>;

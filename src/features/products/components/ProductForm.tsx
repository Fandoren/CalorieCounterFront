"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DecimalInput } from "@/components/common/input/DecimalInput";
import { Input } from "@/components/ui/input";

const productSchema = z.object({
  name: z.string().min(2, "Название слишком короткое"),
  protein: z
    .transform((val) => Number(String(val).replace(",", ".")))
    .pipe(z.number().min(0, "Белки должны быть неотрицательными")),
  fat: z
    .transform((val) => Number(String(val).replace(",", ".")))
    .pipe(z.number().min(0, "Жиры должны быть неотрицательными")),
  carbs: z
    .transform((val) => Number(String(val).replace(",", ".")))
    .pipe(z.number().min(0, "Углеводы должны быть неотрицательными")),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface Props {
  onSubmit: (values: ProductFormValues) => void;
}

export function ProductForm({ onSubmit }: Props) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        {/* Название продукта */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Например, Курица" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Белки */}
        <FormField
          control={form.control}
          name="protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Белки (г)</FormLabel>
              <FormControl>
                <DecimalInput {...field} placeholder="0.0" decimalScale={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Жиры */}
        <FormField
          control={form.control}
          name="fat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Жиры (г)</FormLabel>
              <FormControl>
                <DecimalInput {...field} placeholder="0.0" decimalScale={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Углеводы */}
        <FormField
          control={form.control}
          name="carbs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Углеводы (г)</FormLabel>
              <FormControl>
                <DecimalInput {...field} placeholder="0.0" decimalScale={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Создать продукт</Button>
      </form>
    </Form>
  );
}
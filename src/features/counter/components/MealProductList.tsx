import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { MealProduct } from "../types";
import { caloriesToCCal } from "@/lib/utils";

export function MealProductList({
  products,
  onRemove,
}: {
  products: MealProduct[];
  onRemove: (id: number) => void;
}) {
  return (
    <div className="space-y-2 mb-4">
      {products.map((p) => {
        const protein = caloriesToCCal(p?.product.protein);
        const fat = caloriesToCCal(p?.product.fat);
        const carbs = caloriesToCCal(p?.product.carbs);

        const portionProtein = (protein * p.grams) / 100;
        const portionFat = (fat * p.grams) / 100;
        const portionCarbs = (carbs * p.grams) / 100;

        return (
          <Card key={p.id}>
            <CardContent className="flex flex-col gap-2 pt-4">
              <div className="flex items-center justify-between">
                <span>
                  {p.product.name} ({p.grams} г)
                </span>
                <span>{p.calories} ккал</span>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between pl-2">
                <span>Б: {portionProtein.toFixed(1)}г</span>
                <span>Ж: {portionFat.toFixed(1)}г</span>
                <span>У: {portionCarbs.toFixed(1)}г</span>
              </div>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (p.id !== undefined) onRemove(p.id);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

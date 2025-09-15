import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { MealProduct } from "../types";

export function MealProductList({
  products,
  onRemove,
}: {
  products: MealProduct[];
  onRemove: (id: number) => void;
}) {
  return (
    <div className="space-y-2 mb-4">
      {products.map((p) => (
        <Card key={p.id}>
          <CardContent className="flex items-center justify-between">
            <span>
              {p.product.name} ({p.grams} г)
            </span>
            <div className="flex items-center space-x-2">
              <span>{p.calories} ккал</span>
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
      ))}
    </div>
  );
}

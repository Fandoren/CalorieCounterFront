import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { MealCardProps } from "../types";

export function MealCard({
  mealTime,
  name,
  products,
  onEdit,
  onDelete,
}: MealCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {mealTime} – {name}
        </CardTitle>

        <div className="flex items-center gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              aria-label="Редактировать"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              aria-label="Удалить"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ul className="divide-y">
          {products.map((product) => (
            <li key={product.id} className="py-2 flex justify-between">
              <span>
                {product.product.name} ({product.grams} г)
              </span>
              <span className="text-sm text-muted-foreground">
                {product.calories} ккал
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <span className="font-semibold mr-1">Всего:</span>
        {products.reduce((total, product) => total + product.calories, 0)} ккал
      </CardFooter>
    </Card>
  );
}

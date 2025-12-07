import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { MealCardProps } from "../types";

// eslint-disable-next-line react/prop-types,react/prefer-stateless-function
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const MealCard = ({
  id,
  year,
  month,
  day,
  mealTime,
  name,
  products,
  onEdit,
  onDelete,
  isEditMode,
}: MealCardProps) => {
  const dateStr = `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-lg font-semibold">
          {dateStr} {mealTime} – {name}
        </CardTitle>

        <div className="flex items-center gap-1">
          {onEdit && isEditMode && (
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onEdit({
                id,
                year,
                month,
                day,
                mealTime,
                name,
                products,
              })}
              aria-label="Редактировать"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && isEditMode && (
            <Button
              variant="destructive"
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
};

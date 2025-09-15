import { MealCard } from "./MealCard";
import { MealListProps } from "../types";

export function MealList({ meals, onEdit, onDelete }: MealListProps) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          {...meal}
          onEdit={() => onEdit(meal)}
          onDelete={() => onDelete(meal)}
        />
      ))}
    </div>
  );
}
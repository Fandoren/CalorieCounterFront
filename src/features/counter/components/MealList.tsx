import { MealCard } from "./MealCard";
import { MealListProps } from "../types";

// eslint-disable-next-line react/prop-types
export const MealList = (
  { meals, onEdit, onDelete, isEditMode }: MealListProps,
) => {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <MealCard
          key={meal.id}
          {...meal}
          onEdit={onEdit ? (mealToEdit) => onEdit(mealToEdit) : undefined}
          onDelete={onDelete ? () => onDelete(meal) : undefined}
          isEditMode={isEditMode}
        />
      ))}
    </div>
  );
};
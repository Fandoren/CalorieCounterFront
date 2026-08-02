import { Separator } from "@/components/ui/separator";
import { MealSummapryProps } from "../types";
import { Meal } from "../types";
import { caloriesToCCal } from "@/lib/utils";

interface MealSummaryProps extends MealSummapryProps {
  meals?: Meal[];
}

export function MealSummary({ totalCalories, hasMeals, meals = [] }: MealSummaryProps) {
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;

  meals.forEach((meal) => {
    meal.products.forEach((product) => {
      totalProtein += product?.product.protein || 0;
      totalFat += product?.product.fat || 0;
      totalCarbs += product?.product.carbs || 0;
    });
  });

  const displayProtein = caloriesToCCal(totalProtein);
  const displayFat = caloriesToCCal(totalFat);
  const displayCarbs = caloriesToCCal(totalCarbs);

  if (!hasMeals) return <div className="text-xl">Нет приёмов пищи</div>;
  return (
    <div className="w-full flex flex-col items-center">
      <Separator className="w-full mb-2" />
      <div className="text-xl mb-2">Итого за день: {totalCalories} ккал</div>
      <div className="text-sm text-muted-foreground space-y-1">
        <div className="flex gap-4">
          <span>Белки: <span className="font-medium">{displayProtein.toFixed(1)}г</span></span>
          <span>Жиры: <span className="font-medium">{displayFat.toFixed(1)}г</span></span>
          <span>Углеводы: <span className="font-medium">{displayCarbs.toFixed(1)}г</span></span>
        </div>
      </div>
    </div>
  );
}
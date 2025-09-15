import { Separator } from "@/components/ui/separator";
import { MealSummapryProps } from "../types";

export function MealSummary({ totalCalories, hasMeals }: MealSummapryProps) {
  if (!hasMeals) return <div className="text-xl">Нет приёмов пищи</div>;
  return (
    <div className="w-full flex flex-col items-center">
      <Separator className="w-full mb-2" />
      <div className="text-xl">Итого за день: {totalCalories} ккал</div>
    </div>
  );
}
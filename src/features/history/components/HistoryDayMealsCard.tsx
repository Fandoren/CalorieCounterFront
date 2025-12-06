import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Meal } from "../../counter/types";
import { MealList } from "../../counter/components/MealList";
import { Loader } from "@/components/common/loader/Loader";
import { fetchDayMeals } from "@/features/counter/api";

interface HistoryDayMealsCardProps {
  day: dayjs.Dayjs;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HistoryDayMealsCard({
  day,
  open,
  onOpenChange,
}: HistoryDayMealsCardProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (open) {
      loadMeals();
    }
  }, [open, day]);

  const loadMeals = async () => {
    setLoading(true);
    try {
      const data = await fetchDayMeals(day.year(), day.month() + 1, day.date());
      setMeals(data);
    } catch (err) {
      console.error("Ошибка при загрузке приёмов пищи:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = meals.reduce(
    (sum, meal) =>
      sum +
      meal.products.reduce((mealSum, product) => mealSum + product.calories, 0),
    0
  );

  return (
    <div className="flex justify-center">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Приёмы пищи за {day.format("DD.MM.YYYY")}</DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader />
            </div>
          ) : meals.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              В этот день не добавлено приёмов пищи
            </p>
          ) : (
            <>
              <MealList
                meals={meals}
                onEdit={isEditMode ? () => {} : undefined}
                onDelete={isEditMode ? () => {} : undefined}
                isEditMode={isEditMode}
              />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold text-lg">
                  Всего за день: {totalCalories} ккал
                </p>
              </div>
            </>
          )}

          {meals.length > 0 && (
            <div className="mt-4 flex justify-between">
              <Button
                variant={isEditMode ? "default" : "outline"}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode
                  ? "Завершить редактирование"
                  : "Включить редактирование"}
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
            </div>
          )}

          {meals.length === 0 && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Meal, MealFormData } from "../../counter/types";
import { MealList } from "../../counter/components/MealList";
import { Loader } from "@/components/common/loader/Loader";
import { fetchDayMeals, updateMeal, addMeal, deleteMeal } from "@/features/counter/api";
import MealForm from "../../counter/components/MealForm";
import DeleteMealDialog from "../../counter/components/DeleteMealDialog";

interface HistoryDayMealsCardProps {
  readonly day: dayjs.Dayjs;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onDataChanged?: () => void;
}

export default function HistoryDayMealsCard({
  day,
  open,
  onOpenChange,
  onDataChanged,
}: HistoryDayMealsCardProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const onDialogStateChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setIsEditMode(false);
    }
  };

  const handleEditMeal = async (values: MealFormData) => {
    if (!editingMeal) return;
    try {
      await updateMeal(editingMeal.id, values);
      setEditDialogOpen(false);
      setEditingMeal(null);
      await loadMeals();
      onDataChanged?.();
    } catch (err) {
      console.error("Ошибка при обновлении приёма пищи:", err);
    }
  };

  const handleAddNewMeal = async (values: MealFormData) => {
    try {
      await addMeal(values);
      setAddDialogOpen(false);
      await loadMeals();
      onDataChanged?.();
    } catch (err) {
      console.error("Ошибка при добавлении приёма пищи:", err);
    }
  };

  const handleDeleteMealClick = (meal: Meal) => {
    setMealToDelete(meal);
    setDeleteDialogOpen(true);
  };

  const handleDeleteMealConfirmed = async () => {
    if (!mealToDelete) return;
    try {
      await deleteMeal(mealToDelete.id);
      setDeleteDialogOpen(false);
      setMealToDelete(null);
      await loadMeals();
      onDataChanged?.();
    } catch (err) {
      console.error("Ошибка при удалении приёма пищи:", err);
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
      <Dialog open={open} onOpenChange={onDialogStateChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Приёмы пищи за {day.format("DD.MM.YYYY")}</DialogTitle>
          </DialogHeader>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader />
            </div>
          )}

          {!loading && meals.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              В этот день не добавлено приёмов пищи
            </p>
          )}

          {!loading && meals.length > 0 && (
            <>
              <MealList
                meals={meals}
                onEdit={(meal) => {
                  setEditingMeal(meal);
                  setEditDialogOpen(true);
                }}
                onDelete={(meal) => handleDeleteMealClick(meal)}
                isEditMode={isEditMode}
              />
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold text-lg">
                  Всего за день: {totalCalories} ккал
                </p>
              </div>
            </>
          )}

          {isEditMode && (
            <div className="flex justify-center mb-4">
              <Button variant="outline" onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Добавить приём пищи
              </Button>
            </div>
          )}

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
        </DialogContent>
      </Dialog>

      {editingMeal && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать приём пищи</DialogTitle>
            </DialogHeader>
            <MealForm
              onSubmit={handleEditMeal}
              onClose={() => {
                setEditDialogOpen(false);
                setEditingMeal(null);
              }}
              initialData={{
                year: editingMeal.year,
                month: editingMeal.month,
                day: editingMeal.day,
                mealTime: editingMeal.mealTime,
                name: editingMeal.name,
                products: editingMeal.products,
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить приём пищи</DialogTitle>
          </DialogHeader>
          <MealForm
            onSubmit={handleAddNewMeal}
            onClose={() => setAddDialogOpen(false)}
            initialData={{
              year: day.year(),
              month: day.month() + 1,
              day: day.date(),
              mealTime: `${String(new Date().getHours()).padStart(
                2,
                "0"
              )}:${String(new Date().getMinutes()).padStart(2, "0")}`,
              name: "",
              products: [],
            }}
          />
        </DialogContent>
      </Dialog>

      {mealToDelete && (
        <DeleteMealDialog
          mealToDelete={mealToDelete}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onDeleteConfirmed={handleDeleteMealConfirmed}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MealForm from "../components/MealForm";
import { Meal, MealFormData } from "../types";
import { MealList } from "../components/MealList";
import { MealSummary } from "../components/MealSummary";
import { addMeal, deleteMeal, fetchTodayMeals, updateMeal } from "../api";
import DeleteMealDialog from "../components/DeleteMealDialog";
import Loader from "@/components/common/loader/Loader";

export default function DailyCounter() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalCalories = meals.reduce(
    (sum, meal) =>
      sum + meal.products.reduce((pSum, p) => pSum + (p.calories || 0), 0),
    0
  );

  function openDeleteDialog(meal: Meal) {
    setMealToDelete(meal);
    setDeleteDialogOpen(true);
  }

  // Загружаем приёмы пищи при открытии страницы
  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    setLoading(true);
    try {
      const data = await fetchTodayMeals();
      setMeals(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddMeal(values: MealFormData) {
    try {
      if (editingMeal) {
        // Обновляем существующий приём пищи
        await updateMeal(editingMeal.id, values);
      } else {
        // Добавляем новый приём пищи
        await addMeal(values);
      }
      setOpen(false);
      setEditingMeal(null);
      await loadMeals(); // Перезагружаем список после добавления/обновления
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteMealConfirmed() {
    if (!mealToDelete) return;

    try {
      await deleteMeal(mealToDelete.id);
      setDeleteDialogOpen(false);
      setMealToDelete(null);
      await loadMeals(); // Перезагружаем список после удаления
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMeal(null)}>
              <Plus className="mr-2 h-4 w-4" /> Добавить приём пищи
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMeal ? "Редактировать приём пищи" : "Новый приём пищи"}
              </DialogTitle>
            </DialogHeader>

            <MealForm
              onSubmit={handleAddMeal}
              onClose={() => setOpen(false)}
              initialData={
                editingMeal
                  ? {
                      id: editingMeal.id,
                      year: editingMeal.year,
                      month: editingMeal.month,
                      day: editingMeal.day,
                      mealTime: editingMeal.mealTime,
                      name: editingMeal.name,
                      products: editingMeal.products,
                    }
                  : undefined
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="flex justify-center text-2xl font-bold">Мой рацион за сегодня</h1>

      {loading ? (
        <div className="flex justify-center items-center flex-1 text-muted-foreground">
          <Loader />
        </div>
      ) : (
        <>
          <MealList
            meals={meals}
            onEdit={(meal) => {
              setEditingMeal(meal);
              setOpen(true);
            }}
            onDelete={openDeleteDialog}
            isEditMode={true}
          />

          <div className="flex justify-center mt-4">
            <MealSummary
              totalCalories={totalCalories}
              hasMeals={meals.length > 0}
            />
          </div>
        </>
      )}

      <DeleteMealDialog
        mealToDelete={mealToDelete!}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteConfirmed={handleDeleteMealConfirmed}
      />
    </div>
  );
}

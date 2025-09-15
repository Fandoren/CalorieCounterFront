import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MealProduct } from "../types";
import { MealProductSelect } from "./MealProductSelect";
import { Product } from "@/features/products/types";
import { useCalories } from "../hooks";

export function MealProductForm({
  onAdd,
  onCancel,
}: {
  onAdd: (product: MealProduct) => void;
  onCancel: () => void;
}) {
  const [newProduct, setNewProduct] = useState<MealProduct>({
    grams: 0,
    calories: 0,
    product: { id: 0, name: "", protein: 0, fat: 0, carbs: 0 },
  });

  const [manualCalories, setManualCalories] = useState(false);

  // Используем хук для автоматического расчёта калорий
  const calculatedCalories = useCalories(
    newProduct.product.id !== 0 ? newProduct.product : null,
    newProduct.grams,
    manualCalories,
    newProduct.calories
  );

  // Обновляем calories автоматически, если не вручную
  useEffect(() => {
    if (!manualCalories) {
      setNewProduct((prev) => ({ ...prev, calories: calculatedCalories }));
    }
  }, [calculatedCalories, manualCalories]);

  const handleAdd = () => {
    if (
      !newProduct.product.name ||
      newProduct.grams <= 0 ||
      newProduct.calories <= 0
    )
      return;

    onAdd({ ...newProduct });
    resetForm();
  };

  const resetForm = () => {
    setManualCalories(false);
    setNewProduct({
      id: 0,
      grams: 0,
      calories: 0,
      product: { id: 0, name: "", protein: 0, fat: 0, carbs: 0 },
    });
  };

  return (
    <Card className="mb-4 p-4 space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Продукт</label>
        <MealProductSelect
          onSelect={(product: Product) => {
            setNewProduct((prev) => ({
              ...prev,
              product,
              calories: 0, // сбрасываем, чтобы хук пересчитал
            }));
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Граммовка</label>
        <Input
          placeholder="Граммы, г"
          type="number"
          min={1}
          value={newProduct.grams === 0 ? "" : newProduct.grams}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              grams: Number(e.target.value) || 0,
            }))
          }
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium">Калории</label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manualCalories"
              checked={manualCalories}
              onCheckedChange={(checked: boolean) =>
                setManualCalories(!!checked)
              }
            />
            <label htmlFor="manualCalories" className="text-sm cursor-pointer">
              Указать вручную
            </label>
          </div>
        </div>
        <Input
          placeholder="Калории, ккал"
          type="number"
          min={1}
          value={newProduct.calories === 0 ? "" : newProduct.calories}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              calories: Number(e.target.value) || 0,
            }))
          }
          disabled={!manualCalories}
        />
      </div>

      <div className="flex justify-end space-x-2 mt-2">
        <Button size="sm" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button
          size="sm"
          onClick={handleAdd}
          disabled={
            !newProduct.product.name ||
            newProduct.grams <= 0 ||
            newProduct.calories <= 0
          }
        >
          Готово
        </Button>
      </div>
    </Card>
  );
}

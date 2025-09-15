import { Input } from "@/components/ui/input";
import { MealFormData } from "../types";

export function MealInfoFields({
  formData,
  setFormData,
}: {
  formData: MealFormData;
  setFormData: (data: MealFormData) => void;
}) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Название приёма пищи
        </label>
        <Input
          placeholder="Например: Завтрак"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Дата</label>
        <Input
          type="date"
          value={formData.mealDate}
          onChange={(e) => setFormData({ ...formData, mealDate: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Время</label>
        <Input
          type="time"
          value={formData.mealTime}
          onChange={(e) => setFormData({ ...formData, mealTime: e.target.value })}
        />
      </div>
    </>
  );
}

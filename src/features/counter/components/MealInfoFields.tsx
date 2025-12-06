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

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-1">Год</label>
          <Input
            id="year"
            type="number"
            min={2000}
            max={2100}
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="month" className="block text-sm font-medium mb-1">Месяц</label>
          <Input
            id="month"
            type="number"
            min={1}
            max={12}
            value={formData.month}
            onChange={e => setFormData({ ...formData, month: Number(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor="day" className="block text-sm font-medium mb-1">День</label>
          <Input
            id="day"
            type="number"
            min={1}
            max={31}
            value={formData.day}
            onChange={e => setFormData({ ...formData, day: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="mealTime" className="block text-sm font-medium mb-1">Время</label>
        <Input
          id="mealTime"
          type="time"
          value={formData.mealTime}
          onChange={e => setFormData({ ...formData, mealTime: e.target.value })}
        />
      </div>
    </>
  );
}

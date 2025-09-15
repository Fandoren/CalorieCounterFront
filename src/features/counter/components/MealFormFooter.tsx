import { Button } from "@/components/ui/button";

export function MealFormFooter({
  totalCalories,
  onCancel,
  onSave,
  canSave,
  addButtonLabel,
}: {
  totalCalories: number;
  onCancel: () => void;
  onSave: () => void;
  canSave: boolean;
  addButtonLabel: string;
}) {
  return (
    <div className="mt-4 flex justify-between items-center">
      <span className="text-sm font-medium">Всего ккал: {totalCalories}</span>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Отменить
        </Button>
        <Button onClick={onSave} disabled={!canSave}>
          {addButtonLabel}
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Meal } from "../types";

interface DeleteMealDialogProps {
    mealToDelete: Meal;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleteConfirmed: () => void;
}

export default function DeleteMealDialog({
  mealToDelete,
  open,
  onOpenChange,
  onDeleteConfirmed
}: DeleteMealDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить приём пищи?</DialogTitle>
          </DialogHeader>
          <p className="mt-2">
            Вы действительно хотите удалить приём пищи: "{mealToDelete?.name}"?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button variant="destructive" onClick={onDeleteConfirmed}>
              Удалить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  );
}

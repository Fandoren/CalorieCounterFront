import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProduct } from "@/features/products/api";
import { useNavigate } from "react-router";

interface DeleteProductDialogProps {
  productId: number;
  productName: string;
}

export default function DeleteProductDialog({
  productId,
  productName,
}: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteProduct(productId);
      setOpen(false);
      navigate("/products");
    } catch (err) {
      console.error("Ошибка при удалении продукта:", err);
      alert("Ошибка при удалении продукта");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить продукт?</DialogTitle>
          <DialogDescription>
            Это действие нельзя отменить. Продукт{" "}
            <span className="font-semibold">{productName}</span> будет удалён
            навсегда.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Отмена
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Удаление..." : "Удалить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

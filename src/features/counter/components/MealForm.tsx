import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { calcTotalCalories, getCurrentLocalTime } from "@/lib/utils";
import { MealFormData, MealFormProps, MealProduct } from "../types";
import { MealInfoFields } from "./MealInfoFields";
import { MealProductList } from "./MealProductList";
import { MealProductForm } from "./MealProductForm";
import { MealFormFooter } from "./MealFormFooter";

export default function MealForm({
  onSubmit,
  onClose,
  initialData,
}: MealFormProps & { initialData?: MealFormData }) {
  const [formData, setFormData] = useState<MealFormData>(
    initialData || {
      mealDate: new Date().toISOString().slice(0, 10),
      mealTime: getCurrentLocalTime(),
      name: "",
      products: [],
    }
  );

  const [productFormOpen, setProductFormOpen] = useState(false);

  const addProduct = (product: MealProduct) => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
    setProductFormOpen(false);
  };

  const removeProduct = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || formData.products.length === 0) return;
    onSubmit(formData);
    onClose();
  };

  const addButtonLabel = initialData ? "Сохранить" : "Добавить";

  return (
    <div className="max-w-lg">
      <MealInfoFields formData={formData} setFormData={setFormData} />

      <MealProductList products={formData.products} onRemove={removeProduct} />

      {productFormOpen ? (
        <MealProductForm onAdd={addProduct} onCancel={() => setProductFormOpen(false)} />
      ) : (
        <div className="flex justify-center mb-4">
          <Button variant="outline" onClick={() => setProductFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Добавить продукт
          </Button>
        </div>
      )}

      <MealFormFooter
        totalCalories={calcTotalCalories(formData.products)}
        onCancel={onClose}
        onSave={handleSubmit}
        canSave={!!formData.name && formData.products.length > 0}
        addButtonLabel={addButtonLabel}
      />
    </div>
  );
}

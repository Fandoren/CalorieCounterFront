import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { ProductForm, ProductFormValues } from "../components/ProductForm";
import { Button } from "@/components/ui/button";
import { createProduct } from "../api";
import { ccalToCalories } from "@/lib/utils";

export default function ProductCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (values: ProductFormValues) => {
    const payload = {
      name: values.name,
      protein: ccalToCalories(values.protein),
      fat: ccalToCalories(values.fat),
      carbs: ccalToCalories(values.carbs),
    };
    try {
      const created = await createProduct(payload);
      console.log("Создан продукт:", created);

      navigate("/products");
    } catch (err) {
      console.error("Ошибка при создании продукта", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[90%] max-w-5xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_150px] gap-6">
          <aside>
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Назад
            </Button>
          </aside>
          <main>
            <Card className="max-w-lg mx-auto">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-4">Создать продукт</h1>
                <ProductForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

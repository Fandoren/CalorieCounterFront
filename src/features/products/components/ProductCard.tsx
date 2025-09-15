import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/features/products/hooks";
import Loader from "@/components/common/loader/Loader";
import DeleteProductDialog from "@/features/products/components/DeleteProductDialog";

export default function ProductCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="p-6 text-3xl text-center text-destructive">
          Ошибка: {error}
        </div>
        <Button
          className="w-[30%]"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </Button>
      </div>
    );

  if (!product)
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="p-6 text-3xl text-center">Продукт не найден</div>
        <Button
          className="w-[30%]"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </Button>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Кнопки управления */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Назад
        </Button>
        <DeleteProductDialog
          productId={product.id}
          productName={product.name}
        />
      </div>

      {/* Карточка продукта */}
      <Card className="p-6">
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex items-center justify-center bg-muted rounded-lg h-64">
            <span className="text-muted-foreground">Изображение</span>
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">
              {product.description ?? "Описание отсутствует"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-accent text-center">
                <div className="text-sm text-muted-foreground">Белки</div>
                <div className="text-lg font-semibold">{product.protein} г</div>
              </div>
              <div className="p-3 rounded-lg bg-accent text-center">
                <div className="text-sm text-muted-foreground">Жиры</div>
                <div className="text-lg font-semibold">{product.fat} г</div>
              </div>
              <div className="p-3 rounded-lg bg-accent text-center">
                <div className="text-sm text-muted-foreground">Углеводы</div>
                <div className="text-lg font-semibold">{product.carbs} г</div>
              </div>
              <div className="p-3 rounded-lg bg-accent text-center">
                <div className="text-sm text-muted-foreground">Калории</div>
                <div className="text-lg font-semibold">
                  {Math.round(
                    product.protein * 4 + product.fat * 9 + product.carbs * 4
                  )}{" "}
                  ккал
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

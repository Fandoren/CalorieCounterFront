import { Link } from "react-router";
import { Product } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { calculateCalories, caloriesToCCal } from "@/lib/utils";

interface Props {
  products: Product[];
}

let countCalories = (protein: number, fat: number, carbs: number) => {
  let proteinVal = caloriesToCCal(protein);
  let fatVal = caloriesToCCal(fat);
  let carbsVal = caloriesToCCal(carbs);

  return calculateCalories(proteinVal, fatVal, carbsVal);
};

export function ProductList({ products }: Props) {
  return (
    <div className="grid gap-2">
      {products.map((p) => (
        <Link key={p.id} to={`/products/${p.id}`}>
          <Card className="hover:bg-muted/40 transition">
            <CardContent className="p-4">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm mt-1">Пищевая ценность на 100 г</div>
              <div className="text-sm text-muted-foreground">
                <div className="grid grid-cols-4 grid-flow-row">
                  <div>
                    <span className="font-bold">Белки:</span>{" "}
                    {caloriesToCCal(p.protein)}г
                  </div>
                  <div>
                    <span className="font-bold">Жиры:</span>{" "}
                    {caloriesToCCal(p.fat)}г
                  </div>
                  <div>
                    <span className="font-bold">Углеводы:</span>{" "}
                    {caloriesToCCal(p.carbs)}г
                  </div>
                  <div>
                    <span className="font-bold">Калории:</span> {" "}
                    {countCalories(p.protein, p.fat, p.carbs)} ккал
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

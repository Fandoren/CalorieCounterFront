import { Link } from "react-router"
import { Product } from "../types"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  products: Product[]
}

export function ProductList({ products }: Props) {
  return (
    <div className="grid gap-2">
      {products.map((p) => (
        <Link key={p.id} to={`/products/${p.id}`}>
          <Card className="hover:bg-muted/40 transition">
            <CardContent className="p-4">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-muted-foreground">
                Белки: {p.protein}г • Жиры: {p.fat}г • Углеводы: {p.carbs}г
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

import { useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/features/products/hooks"
import Loader from "@/components/common/loader/Loader"

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { product, loading } = useProduct(Number(id))

  if (loading) return <Loader/>
  if (!product) return <div className="p-6">Продукт не найден</div>

  return (
    <div className="p-6 space-y-4">
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Назад
      </Button>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="text-lg">
        <p>Белки: {product.protein} г</p>
        <p>Жиры: {product.fat} г</p>
        <p>Углеводы: {product.carbs} г</p>
      </div>
    </div>
  )
}

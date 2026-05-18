import { Wrapper } from "@/components/dishes/wrapper"
import { ProductService } from "@/services/product-service"

export const dynamic = "force-dynamic"

export default async function DishesPage() {
  const productService = new ProductService()
  const products = await productService.getProducts()

  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Dishes</h1>
      <Wrapper products={products ?? []} />
    </div>
  )
}

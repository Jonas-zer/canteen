import { Wrapper } from "@/components/warehouse/wrapper"
import { ProductService } from "@/services/product-service"

export const dynamic = "force-dynamic"

export default async function WarehousePage() {
  const productService = new ProductService()
  const products = await productService.getProducts()

  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Warehouse</h1>
      <Wrapper products={products ?? []} />
    </div>
  )
}

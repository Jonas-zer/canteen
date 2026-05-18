import { ProductService } from "@/services/product-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const productService = new ProductService()
  const products = await productService.getProducts()
  return Response.json(products)
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const productService = new ProductService()
  await productService.saveProduct(res)
  return Response.json({ message: "Data are saved" })
}

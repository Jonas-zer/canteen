import { IProduct } from "@/models/product-model"
import { ProductService } from "@/services/product-service"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const product: IProduct = await request.json()
  const productService = new ProductService()
  await productService.updateProduct(product)
  return Response.json({ message: "The update was completed successfully" })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const productService = new ProductService()
  await productService.deleteProduct(id)
  return Response.json({ message: "The deletion was completed successfully" })
}

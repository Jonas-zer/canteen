import { WarehouseService } from "@/services/warehouse-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const warehouseService = new WarehouseService()
  const items = await warehouseService.getWarehouseItems()
  return Response.json(items)
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const warehouseService = new WarehouseService()
  await warehouseService.saveWarehouseItem(res)
  return Response.json({ message: "Data are saved" })
}

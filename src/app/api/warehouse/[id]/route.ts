import { IWarehouse } from "@/models/warehouse-model"
import { WarehouseService } from "@/services/warehouse-service"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const item: IWarehouse = await request.json()
  const warehouseService = new WarehouseService()
  await warehouseService.updateWarehouseItem(item)
  return Response.json({ message: "The update was completed successfully" })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const warehouseService = new WarehouseService()
  await warehouseService.deleteWarehouseItem(id)
  return Response.json({ message: "The deletion was completed successfully" })
}

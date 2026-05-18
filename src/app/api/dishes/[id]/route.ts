import { IDish } from "@/models/dish-model"
import { DishService } from "@/services/dish-service"
import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const dish: IDish = await request.json()
  const dishService = new DishService()
  await dishService.updateDish(dish)
  return Response.json({ message: "The update was completed successfully" })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const dishService = new DishService()
  await dishService.deleteDish(id)
  return Response.json({ message: "The deletion was completed successfully" })
}

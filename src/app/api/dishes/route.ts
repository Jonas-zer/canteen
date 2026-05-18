import { DishService } from "@/services/dish-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const dishService = new DishService()
  const dishes = await dishService.getDishes()
  return Response.json(dishes)
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const dishService = new DishService()
  await dishService.saveDish(res)
  return Response.json({ message: "Data are saved" })
}

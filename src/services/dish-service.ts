import { Dish, IDish } from "@/models/dish-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { toPlainArray } from "@/utils/to-plain"
import { Types } from "mongoose"

export class DishService {
  async getDishes(): Promise<IDish[]> {
    await connectMongoose()
    const dishes = await Dish.find().sort({ dishName: 1 })
    return toPlainArray<IDish>(dishes)
  }

  async saveDish(dish: IDish): Promise<void> {
    await connectMongoose()
    await Dish.create(dish)
  }

  async updateDish(dish: IDish): Promise<void> {
    await connectMongoose()
    const id = dish.id ?? ""
    delete dish.id
    await Dish.updateOne({ _id: new Types.ObjectId(id) }, dish)
  }

  async deleteDish(id: string): Promise<void> {
    await connectMongoose()
    await Dish.deleteOne({ _id: new Types.ObjectId(id) })
  }
}

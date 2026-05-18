import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IDish {
  id?: string
  dishName: string
  productId: string
  requiredQuantity: number
}

type IReturnType = WithStringId<IDish>

const DishSchema = new Schema<IDish>(
  {
    dishName: String,
    productId: String,
    requiredQuantity: Number,
  },
  {
    timestamps: false,
    collection: "dishes",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IDish & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Dish: Model<IDish> =
  models.Dish || model("Dish", DishSchema)

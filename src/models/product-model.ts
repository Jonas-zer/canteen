import { model, models, Schema, Model, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IProduct {
  id?: string
  name: string
}

type IReturnType = WithStringId<IProduct>

const ProductSchema = new Schema<IProduct>(
  { name: String },
  {
    timestamps: false,
    collection: "products",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IProduct & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Product: Model<IProduct> =
  models.Product || model("Product", ProductSchema)

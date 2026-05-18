import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IWarehouse {
  id?: string
  productId: string
  price: number
  quantity: number
}

type IReturnType = WithStringId<IWarehouse>

const WarehouseSchema = new Schema<IWarehouse>(
  {
    productId: String,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: false,
    collection: "warehouse",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IWarehouse & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  },
)

export const Warehouse: Model<IWarehouse> =
  models.Warehouse || model("Warehouse", WarehouseSchema)

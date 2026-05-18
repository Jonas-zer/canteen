import { Warehouse, IWarehouse } from "@/models/warehouse-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { toPlainArray } from "@/utils/to-plain"
import { Types } from "mongoose"

export class WarehouseService {
  async getWarehouseItems(): Promise<IWarehouse[]> {
    await connectMongoose()
    const items = await Warehouse.find().sort({ productId: 1 })
    return toPlainArray<IWarehouse>(items)
  }

  async saveWarehouseItem(item: IWarehouse): Promise<void> {
    await connectMongoose()
    await Warehouse.create(item)
  }

  async updateWarehouseItem(item: IWarehouse): Promise<void> {
    await connectMongoose()
    const id = item.id ?? ""
    delete item.id
    await Warehouse.updateOne({ _id: new Types.ObjectId(id) }, item)
  }

  async deleteWarehouseItem(id: string): Promise<void> {
    await connectMongoose()
    await Warehouse.deleteOne({ _id: new Types.ObjectId(id) })
  }
}

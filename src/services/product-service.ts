import { Product, IProduct } from "@/models/product-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { toPlainArray } from "@/utils/to-plain"
import { Types } from "mongoose"

export class ProductService {
  async getProducts(): Promise<IProduct[]> {
    await connectMongoose()
    const products = await Product.find().sort({ name: 1 })
    return toPlainArray<IProduct>(products)
  }

  async saveProduct(product: IProduct): Promise<void> {
    await connectMongoose()
    await Product.create(product)
  }

  async updateProduct(product: IProduct): Promise<void> {
    await connectMongoose()
    const id = product.id ?? ""
    delete product.id
    await Product.updateOne({ _id: new Types.ObjectId(id) }, product)
  }

  async deleteProduct(id: string): Promise<void> {
    await connectMongoose()
    await Product.deleteOne({ _id: new Types.ObjectId(id) })
  }
}

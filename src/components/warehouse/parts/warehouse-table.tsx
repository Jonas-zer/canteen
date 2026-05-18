"use client"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"
import { PencilIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/24/solid"
import { deleteApi } from "@/utils/server-api"

type IProps = {
  products: IProduct[]
  items: IWarehouse[]
  setEditItem: (item: IWarehouse) => void
  getItemsFromApi: () => void
}

export function WarehouseTable(props: IProps) {
  const { products, items, setEditItem, getItemsFromApi } = props

  const findProductName = (id?: string) =>
    products.find((p) => p.id === id)?.name ?? "—"

  const changeItem = (id?: string) => {
    if (!id) return
    const item = items.find((i) => i.id === id)
    if (!item) return
    setEditItem(item)
  }

  const deleteItem = async (id?: string) => {
    if (!id) return
    await deleteApi(`/api/warehouse/${id}`)
    getItemsFromApi()
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Product
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Quantity
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4">{findProductName(item.productId)}</td>
            <td className="px-6 py-4">{item.price}</td>
            <td className="px-6 py-4">{item.quantity}</td>
            <td className="px-6 py-4">
              <button
                type="button"
                title="Edit"
                onClick={() => changeItem(item.id)}
              >
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => deleteItem(item.id)}
              >
                <MinusIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

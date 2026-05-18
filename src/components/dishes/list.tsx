"use client"
import { IProduct } from "@/models/product-model"
import { IDish } from "@/models/dish-model"
import { PencilIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/24/solid"
import { deleteApi } from "@/utils/server-api"

type IProps = {
  products: IProduct[]
  dishes: IDish[]
  setEditDish: (dish: IDish) => void
  getDishesFromApi: () => void
}

export function DishList(props: IProps) {
  const { products, dishes, setEditDish, getDishesFromApi } = props

  const findProductName = (id?: string) =>
    products.find((i) => i.id === id)?.name

  const changeDish = (id?: string) => {
    if (!id) return
    const dish = dishes.find((i) => i.id === id)
    if (!dish) return
    setEditDish(dish)
  }

  const deleteDish = async (id?: string) => {
    if (!id) return
    await deleteApi(`/api/dishes/${id}`)
    getDishesFromApi()
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Dish name
          </th>
          <th scope="col" className="px-6 py-3">
            Product
          </th>
          <th scope="col" className="px-6 py-3">
            Required quantity
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {dishes.map((dish) => (
          <tr key={dish.id}>
            <td className="px-6 py-4">{dish.dishName}</td>
            <td className="px-6 py-4">{findProductName(dish.productId)}</td>
            <td className="px-6 py-4">{dish.requiredQuantity}</td>
            <td className="px-6 py-4">
              <button title="Edit" onClick={() => changeDish(dish.id)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Delete" onClick={() => deleteDish(dish.id)}>
                <MinusIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

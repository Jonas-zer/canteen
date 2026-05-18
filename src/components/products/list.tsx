"use client"
import { IProduct } from "@/models/product-model"
import { PencilIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/24/solid"
import { deleteApi } from "@/utils/server-api"

type IProps = {
  products: IProduct[]
  setEditProduct: (product: IProduct) => void
  getProductsFromApi: () => void
}

export function ProductList(props: IProps) {
  const { products, setEditProduct, getProductsFromApi } = props

  const changeProduct = (id?: string) => {
    if (!id) return
    const product = products.find((i) => i.id === id)
    if (!product) return
    setEditProduct(product)
  }

  const deleteProduct = async (id?: string) => {
    if (!id) return
    await deleteApi(`/api/products/${id}`)
    getProductsFromApi()
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Product name
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white border-b">
        {products.map((p) => (
          <tr key={p.id}>
            <td className="px-6 py-4">{p.name}</td>
            <td className="px-6 py-4">
              <button title="Edit" onClick={() => changeProduct(p.id)}>
                <PencilIcon className="w-5 h-5 stroke-blue-600" />
              </button>
              <button title="Delete" onClick={() => deleteProduct(p.id)}>
                <MinusIcon className="w-5 h-5 stroke-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

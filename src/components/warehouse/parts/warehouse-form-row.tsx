"use client"
import { TextField } from "@/components/parts/text-field"
import { SubmitButton } from "@/components/parts/submit-button"
import { useActionState, useEffect, useRef, useState } from "react"
import { saveWarehouseItem } from "@/actions/warehouse"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"
import { IState } from "@/types/shared-t"
import {
  useBoundStore,
  useShallow,
} from "@/components/providers/store-provider"

const initialState: IState = {
  message: "",
  errors: undefined,
  isSaved: false,
}

type IProps = {
  products: IProduct[]
  items: IWarehouse[]
  editItem?: IWarehouse
  setEditItem: (item?: IWarehouse) => void
  getItemsFromApi: () => void
}

export function WarehouseFormRow(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { products, items, editItem, setEditItem, getItemsFromApi } = props
  const [productId, setProductId] = useState<string>(editItem?.productId ?? "")

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    })),
  )

  const [state, formAction] = useActionState<IState, FormData>(
    saveWarehouseItem,
    initialState,
  )

  useEffect(() => {
    setProductId(editItem?.productId ?? "")
  }, [editItem])

  useEffect(() => {
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getItemsFromApi()
      ref.current?.reset()
      setEditItem(undefined)
      setProductId("")
    }
  }, [state, setMessage, getItemsFromApi, setEditItem])

  const existingForProduct = productId
    ? items.find((item) => item.productId === productId)
    : undefined

  const priceDefault = editItem?.price ?? existingForProduct?.price
  const quantityDefault = editItem?.quantity ?? existingForProduct?.quantity
  const recordId = editItem?.id ?? existingForProduct?.id

  return (
    <form
      key={`${productId}-${recordId ?? "new"}`}
      ref={ref}
      action={formAction}
      className="flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-gray-300 pb-6"
    >
      <div className="flex flex-col min-w-[180px]">
        <label
          htmlFor="productId"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select Product
        </label>
        <select
          id="productId"
          name="productId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        >
          <option value=""></option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {state?.errors?.productId && (
          <p className="mt-1 text-sm text-red-600 italic">
            {state.errors.productId.join(" | ")}
          </p>
        )}
      </div>

      <div className="min-w-[120px]">
        <TextField
          label="Price"
          name="Price"
          type="number"
          isRequired={true}
          defaultValue={priceDefault}
          errors={state?.errors?.price}
        />
      </div>

      <div className="min-w-[120px]">
        <TextField
          label="Quantity"
          name="Quantity"
          type="number"
          isRequired={true}
          defaultValue={quantityDefault}
          errors={state?.errors?.quantity}
        />
      </div>

      {recordId && <input type="hidden" name="id" value={recordId} />}

      <SubmitButton name={recordId ? "Add" : "Add"} />

      {state?.message && !state?.errors && (
        <p className="w-full text-sm italic text-green-700">{state.message}</p>
      )}
    </form>
  )
}

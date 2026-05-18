import { Select } from "../parts/select"
import { TextField } from "../parts/text-field"
import { SubmitButton } from "@/components/parts/submit-button"
import { useActionState, useEffect, useRef } from "react"
import { saveWarehouseItem } from "@/actions/warehouse"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"
import { IState } from "@/types/shared-t"
import { toSelArr } from "@/utils/form/select-helper"
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
  getItemsFromApi: () => void
  setEditItem: (item?: IWarehouse) => void
  editItem?: IWarehouse
  onClose: () => void
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { products, getItemsFromApi, editItem, setEditItem, onClose } = props

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
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getItemsFromApi()
      ref.current?.reset()
      setEditItem(undefined)
      onClose()
    }
  }, [state, setMessage, getItemsFromApi, setEditItem, onClose])

  return (
    <form ref={ref} action={formAction} className="grid gap-y-5 max-w-md">
      <div className="grid grid-cols-2">
        <Select
          options={toSelArr<IProduct>(products, "name")}
          selProps={{
            label: "Product",
            name: "productId",
            isRequired: true,
            defaultValue: editItem?.productId,
            error: state?.errors?.productId?.join(" | "),
          }}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Price"
          name="price"
          type="number"
          isRequired={true}
          defaultValue={editItem?.price}
          errors={state?.errors?.price}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          isRequired={true}
          defaultValue={editItem?.quantity}
          errors={state?.errors?.quantity}
        />
      </div>
      {editItem?.id && <input type="hidden" name="id" value={editItem.id} />}

      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>

      <div className="mt-1 w-14">
        <SubmitButton name={editItem?.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

import { Select } from "../parts/select"
import { TextField } from "../parts/text-field"
import { SubmitButton } from "@/components/parts/submit-button"
import { useActionState, useEffect, useRef } from "react"
import { saveDish } from "@/actions/dishes"
import { IProduct } from "@/models/product-model"
import { IDish } from "@/models/dish-model"
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
  getDishesFromApi: () => void
  setEditDish: (dish?: IDish) => void
  editDish?: IDish
  onClose: () => void
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { products, getDishesFromApi, editDish, setEditDish, onClose } = props

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    })),
  )

  const [state, formAction] = useActionState<IState, FormData>(
    saveDish,
    initialState,
  )

  useEffect(() => {
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getDishesFromApi()
      ref.current?.reset()
      setEditDish(undefined)
      onClose()
    }
  }, [state, setMessage, getDishesFromApi, setEditDish, onClose])

  return (
    <form ref={ref} action={formAction} className="grid gap-y-5 max-w-md">
      <div className="grid grid-cols-2">
        <TextField
          label="Dish name"
          name="dishName"
          isRequired={true}
          defaultValue={editDish?.dishName}
          errors={state?.errors?.dishName}
        />
      </div>
      <div className="grid grid-cols-2">
        <Select
          options={toSelArr<IProduct>(products, "name")}
          selProps={{
            label: "Product",
            name: "productId",
            isRequired: true,
            defaultValue: editDish?.productId,
            error: state?.errors?.productId?.join(" | "),
          }}
        />
      </div>
      <div className="grid grid-cols-2">
        <TextField
          label="Required quantity"
          name="requiredQuantity"
          type="number"
          isRequired={true}
          defaultValue={editDish?.requiredQuantity}
          errors={state?.errors?.requiredQuantity}
        />
      </div>
      {editDish?.id && <input type="hidden" name="id" value={editDish.id} />}

      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>

      <div className="mt-1 w-14">
        <SubmitButton name={editDish?.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

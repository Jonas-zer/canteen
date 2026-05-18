import { TextField } from "../parts/text-field"
import { SubmitButton } from "@/components/parts/submit-button"
import { useActionState, useEffect, useRef } from "react"
import { saveProduct } from "@/actions/products"
import { IProduct } from "@/models/product-model"
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
  getProductsFromApi: () => void
  setEditProduct: (product?: IProduct) => void
  editProduct?: IProduct
  onClose: () => void
}

export function FormFields(props: IProps) {
  const ref = useRef<HTMLFormElement>(null)
  const { getProductsFromApi, editProduct, setEditProduct, onClose } = props

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    })),
  )

  const [state, formAction] = useActionState<IState, FormData>(
    saveProduct,
    initialState,
  )

  useEffect(() => {
    if (state.isSaved) {
      setMessage(state?.message ?? "")
      getProductsFromApi()
      ref.current?.reset()
      setEditProduct(undefined)
      onClose()
    }
  }, [state, setMessage, getProductsFromApi, setEditProduct, onClose])

  return (
    <form ref={ref} action={formAction} className="grid gap-y-5 max-w-md">
      <div className="grid grid-cols-2">
        <TextField
          label="Product name"
          name="name"
          isRequired={true}
          defaultValue={editProduct?.name}
          errors={state?.errors?.name}
        />
      </div>
      {editProduct?.id && (
        <input type="hidden" name="id" value={editProduct.id} />
      )}

      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>

      <div className="mt-1 w-14">
        <SubmitButton name={editProduct?.id ? "Update" : "Add"} />
      </div>
    </form>
  )
}

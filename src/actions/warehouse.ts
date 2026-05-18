"use server"
import { IState } from "@/types/shared-t"
import { postApi, putApi } from "@/utils/server-api"
import { z } from "zod"

export async function saveWarehouseItem(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const schema = z.object({
    id: z.coerce.string().optional(),
    productId: z.coerce.string().min(1, "Select a product"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  })

  const rawFormData = {
    id: formData.has("id") ? formData.get("id") : undefined,
    productId: formData.get("productId"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
  }

  const parse = schema.safeParse(rawFormData)

  if (!parse.success) {
    const tree = z.treeifyError(parse.error)
    const fieldErrors: Record<string, string[]> = {}

    if (tree.properties) {
      const props = tree.properties
      for (const key of Object.keys(props) as Array<keyof typeof props>) {
        const field = props[key]
        if (field?.errors?.length) {
          fieldErrors[key] = field.errors
        }
      }
    }

    return {
      errors: fieldErrors,
      message: "Blogai užpildyti laukeliai!",
      isSaved: false,
    }
  }

  const dto = parse.data
  if (!dto?.id) {
    await postApi(`/api/warehouse`, dto)
    return { message: "Duomenys sėkmingai išsaugoti", isSaved: true }
  }
  await putApi(`/api/warehouse/${dto.id}`, dto)
  return { message: "Duomenys sėkmingai atnaujinti", isSaved: true }
}

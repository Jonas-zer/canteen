"use server"
import { IState } from "@/types/shared-t"
import { postApi, putApi } from "@/utils/server-api"
import { z } from "zod"

export async function saveDish(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const schema = z.object({
    id: z.coerce.string().optional(),
    dishName: z.string().min(2, "Dish name must be at least 2 characters"),
    productId: z.coerce.string().min(1, "Select a product"),
    requiredQuantity: z.coerce
      .number()
      .positive("Quantity must be greater than 0"),
  })

  const rawFormData = {
    id: formData.has("id") ? formData.get("id") : undefined,
    dishName: formData.get("dishName"),
    productId: formData.get("productId"),
    requiredQuantity: formData.get("requiredQuantity"),
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
    await postApi(`/api/dishes`, dto)
    return { message: "Duomenys sėkmingai išsaugoti", isSaved: true }
  }
  await putApi(`/api/dishes/${dto.id}`, dto)
  return { message: "Duomenys sėkmingai atnaujinti", isSaved: true }
}

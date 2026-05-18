"use server"
import { IState } from "@/types/shared-t"
import { postApi, putApi } from "@/utils/server-api"
import { z } from "zod"

export async function saveProduct(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const schema = z.object({
    id: z.coerce.string().optional(),
    name: z.string().min(2, "Product name must be at least 2 characters"),
  })

  const rawFormData = {
    id: formData.has("id") ? formData.get("id") : undefined,
    name: formData.get("name"),
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
    await postApi(`/api/products`, dto)
    return { message: "Duomenys sėkmingai išsaugoti", isSaved: true }
  }
  await putApi(`/api/products/${dto.id}`, dto)
  return { message: "Duomenys sėkmingai atnaujinti", isSaved: true }
}

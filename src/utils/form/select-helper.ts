import { IOption } from "@/types/form-t"

export const toSelArr = <T extends { id?: string | number }>(
  arr: T[],
  titleKey: keyof T,
): IOption[] =>
  arr.map((item) => ({
    id: String(item.id),
    title: item[titleKey] as string,
  }))

import { IOption } from "@/types/form-t"
import { useEffect, useState } from "react"

type IProps = {
  options: IOption[]
  selProps: {
    name: string
    label: string
    isRequired: boolean
    defaultValue?: string
    error?: string
  }
}

export function Select(props: IProps) {
  const { options, selProps } = props

  const [value, setValue] = useState<string | undefined>(selProps.defaultValue)

  useEffect(() => {
    setValue(selProps.defaultValue)
  }, [selProps.defaultValue])

  return (
    <>
      <label
        htmlFor={selProps.name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {selProps.label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
        id={selProps.name}
        name={selProps.name}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        required={selProps.isRequired}
      >
        <option value=""></option>
        {options.map((i) => (
          <option key={i.id} value={i.id}>
            {i.title}
          </option>
        ))}
      </select>
      {selProps?.error && (
        <div className="mt-1 col-span-2 p-1 bg-red-100 italic text-sm">
          {selProps.error}
        </div>
      )}
    </>
  )
}

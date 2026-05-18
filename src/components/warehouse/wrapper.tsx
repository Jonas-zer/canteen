"use client"
import { Form } from "./form"
import { WarehouseList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"

type IProps = { products: IProduct[] }

export function Wrapper(props: IProps) {
  const { products } = props
  const [editItem, setEditItem] = useState<IWarehouse | undefined>()
  const [items, setItems] = useState<IWarehouse[]>([])

  const getItemsFromApi = () => {
    getApi<IWarehouse[]>(`/api/warehouse`).then((res) => {
      setItems(res ?? [])
    })
  }

  useEffect(() => {
    getItemsFromApi()
  }, [])

  return (
    <div className="grid gap-y-8">
      <Form
        products={products}
        getItemsFromApi={getItemsFromApi}
        setEditItem={setEditItem}
        editItem={editItem}
      />
      <WarehouseList
        products={products}
        items={items}
        setEditItem={setEditItem}
        getItemsFromApi={getItemsFromApi}
      />
    </div>
  )
}

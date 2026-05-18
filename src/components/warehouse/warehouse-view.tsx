"use client"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"
import { WarehouseFormRow } from "./parts/warehouse-form-row"
import { WarehouseTable } from "./parts/warehouse-table"

type IProps = { products: IProduct[] }

export function WarehouseView(props: IProps) {
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
    <div className="grid grid-flow-row gap-y-6">
      <WarehouseFormRow
        key={editItem?.id ?? "new"}
        products={products}
        items={items}
        editItem={editItem}
        setEditItem={setEditItem}
        getItemsFromApi={getItemsFromApi}
      />
      <WarehouseTable
        products={products}
        items={items}
        setEditItem={setEditItem}
        getItemsFromApi={getItemsFromApi}
      />
    </div>
  )
}

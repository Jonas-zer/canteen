"use client"
import { Form } from "./form"
import { DishList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IProduct } from "@/models/product-model"
import { IDish } from "@/models/dish-model"

type IProps = { products: IProduct[] }

export function Wrapper(props: IProps) {
  const { products } = props
  const [editDish, setEditDish] = useState<IDish | undefined>()
  const [dishes, setDishes] = useState<IDish[]>([])

  const getDishesFromApi = () => {
    getApi<IDish[]>(`/api/dishes`).then((res) => {
      setDishes(res ?? [])
    })
  }

  useEffect(() => {
    getDishesFromApi()
  }, [])

  return (
    <div className="grid gap-y-8">
      <Form
        products={products}
        getDishesFromApi={getDishesFromApi}
        setEditDish={setEditDish}
        editDish={editDish}
      />
      <DishList
        products={products}
        dishes={dishes}
        setEditDish={setEditDish}
        getDishesFromApi={getDishesFromApi}
      />
    </div>
  )
}

"use client"
import { Form } from "./form"
import { ProductList } from "./list"
import { useEffect, useState } from "react"
import { getApi } from "@/utils/server-api"
import { IProduct } from "@/models/product-model"

export function Wrapper() {
  const [editProduct, setEditProduct] = useState<IProduct | undefined>()
  const [products, setProducts] = useState<IProduct[]>([])

  const getProductsFromApi = () => {
    getApi<IProduct[]>(`/api/products`).then((res) => {
      setProducts(res ?? [])
    })
  }

  useEffect(() => {
    getProductsFromApi()
  }, [])

  return (
    <div className="grid gap-y-8">
      <Form
        getProductsFromApi={getProductsFromApi}
        setEditProduct={setEditProduct}
        editProduct={editProduct}
      />
      <ProductList
        products={products}
        setEditProduct={setEditProduct}
        getProductsFromApi={getProductsFromApi}
      />
    </div>
  )
}

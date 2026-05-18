"use client"

import { useEffect, useState } from "react"
import { Modal } from "../modal"
import { FormFields } from "./form-fields"
import { PlusIcon } from "@heroicons/react/24/outline"
import { IProduct } from "@/models/product-model"
import { IDish } from "@/models/dish-model"

type IProps = {
  products: IProduct[]
  getDishesFromApi: () => void
  setEditDish: (dish?: IDish) => void
  editDish?: IDish
}

export function Form(props: IProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { products, getDishesFromApi, editDish, setEditDish } = props

  useEffect(() => {
    if (editDish?.id) setOpenModal(true)
  }, [editDish])

  const handleClose = () => {
    setOpenModal(false)
    setEditDish(undefined)
  }

  return (
    <div>
      <button
        className="flex gap-x-1 ring-1 ring-blue-300 hover:ring-blue-600 rounded-lg py-1 px-3"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        <PlusIcon className="h-6 w-6 stroke-blue-600" /> Add
      </button>
      {openModal ? (
        <Modal
          openModal={openModal}
          setOpenModal={handleClose}
          title="Dish Form"
        >
          <FormFields
            products={products}
            getDishesFromApi={getDishesFromApi}
            editDish={editDish}
            setEditDish={setEditDish}
            onClose={handleClose}
          />
        </Modal>
      ) : null}
    </div>
  )
}

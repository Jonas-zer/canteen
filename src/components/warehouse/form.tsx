"use client"

import { useEffect, useState } from "react"
import { Modal } from "../modal"
import { FormFields } from "./form-fields"
import { PlusIcon } from "@heroicons/react/24/outline"
import { IProduct } from "@/models/product-model"
import { IWarehouse } from "@/models/warehouse-model"

type IProps = {
  products: IProduct[]
  getItemsFromApi: () => void
  setEditItem: (item?: IWarehouse) => void
  editItem?: IWarehouse
}

export function Form(props: IProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { products, getItemsFromApi, editItem, setEditItem } = props

  useEffect(() => {
    if (editItem?.id) setOpenModal(true)
  }, [editItem])

  const handleClose = () => {
    setOpenModal(false)
    setEditItem(undefined)
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
          title="Warehouse Form"
        >
          <FormFields
            products={products}
            getItemsFromApi={getItemsFromApi}
            editItem={editItem}
            setEditItem={setEditItem}
            onClose={handleClose}
          />
        </Modal>
      ) : null}
    </div>
  )
}

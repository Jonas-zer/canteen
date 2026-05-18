"use client"

import { useEffect, useState } from "react"
import { Modal } from "../modal"
import { FormFields } from "./form-fields"
import { PlusIcon } from "@heroicons/react/24/outline"
import { IProduct } from "@/models/product-model"

type IProps = {
  getProductsFromApi: () => void
  setEditProduct: (product?: IProduct) => void
  editProduct?: IProduct
}

export function Form(props: IProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { getProductsFromApi, editProduct, setEditProduct } = props

  useEffect(() => {
    if (editProduct?.id) setOpenModal(true)
  }, [editProduct])

  const handleClose = () => {
    setOpenModal(false)
    setEditProduct(undefined)
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
          title="Product Form"
        >
          <FormFields
            getProductsFromApi={getProductsFromApi}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            onClose={handleClose}
          />
        </Modal>
      ) : null}
    </div>
  )
}

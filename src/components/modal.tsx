import { ReactNode, useEffect, useRef, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

type ISetOpenModal = {
  setOpenModal: (s: boolean) => void
}

type IProps = ISetOpenModal & {
  openModal: boolean
  title: string
  children: ReactNode
}

export function Modal(props: IProps) {
  const { title, openModal, setOpenModal, children } = props
  const [show, setShow] = useState<boolean>(openModal)

  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as HTMLDivElement)
      ) {
        setShow(false)
        setOpenModal(false)
      }
    }
    if (show) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [show, setOpenModal])

  return openModal ? (
    <div className="fixed left-0 top-0 z-10 box-border flex h-screen w-screen justify-center bg-black/50 align-middle">
      <div
        ref={wrapperRef}
        className="w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow h-fit"
      >
        <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="ms-auto flex items-center justify-center rounded-lg hover:bg-gray-200 hover:text-gray-900"
            onClick={() => setOpenModal(false)}
          >
            <XMarkIcon className="h-7 w-7 stroke-gray-400" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="space-y-4 p-4">{children}</div>
      </div>
    </div>
  ) : null
}

"use client"

import type { IMenu } from "@/app/types"
import { ButtonDanger, ButtonPrimary } from "@/components/Button"
import Modal from "@/components/Modal"
import { BASE_API_URL } from "@/global"
import { drop } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const DeleteMenu = ({ selectedMenu }: { selectedMenu: IMenu }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [menu] = useState<IMenu>({ ...selectedMenu })
  const router = useRouter()
  const TOKEN = getCookie("token") || ""

  const openModal = () => {
    setIsShow(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const url = `${BASE_API_URL}/menu/${selectedMenu.id}`
      const { data } = await drop(url, TOKEN)
      if (data?.status) {
        setIsShow(false)
        toast(data?.message, { hideProgressBar: true, autoClose: 2000, containerId: `toastMenu`, type: `success` })
        setTimeout(() => router.refresh(), 1000)
      } else {
        toast(data?.message, { hideProgressBar: true, autoClose: 2000, containerId: `toastMenu`, type: `warning` })
      }
    } catch (error) {
      console.error(error)
      toast(`Something went wrong`, { hideProgressBar: true, autoClose: 2000, containerId: `toastMenu`, type: `error` })
    }
  }

  return (
    <div>
      <ToastContainer containerId={`toastMenu`} />
      <ButtonDanger type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </ButtonDanger>
      <Modal isShow={isShow} onClose={() => setIsShow(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Delete Menu</h2>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setIsShow(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <p className="text-gray-700">Are you sure you want to delete the menu item "{menu.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">
              This action cannot be reversed. All data associated with this menu item will be permanently removed from
              our servers.
            </p>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
              Cancel
            </ButtonDanger>
            <ButtonPrimary type="submit">Delete</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default DeleteMenu


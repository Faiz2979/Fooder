"use client"

import type { IMenu } from "@/app/types"
import { ButtonDanger, ButtonInfo, ButtonPrimary } from "@/components/Button"
import FileInput from "@/components/FileInput"
import { InputGroupComponent } from "@/components/InputComponents"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const EditMenu = ({ selectedMenu }: { selectedMenu: IMenu }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [menu, setMenu] = useState<IMenu>({ ...selectedMenu })
  const router = useRouter()
  const TOKEN = getCookie("token") || ""
  const [file, setFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const openModal = () => {
    setMenu({ ...selectedMenu })
    setIsShow(true)
    if (formRef.current) formRef.current.reset()
  }

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const url = `${BASE_API_URL}/menu/${selectedMenu.id}`
      const { name, price, description, category } = menu
      const payload = new FormData()
      payload.append("name", name || "")
      payload.append("price", (price ?? 0).toString())
      payload.append("description", description || "")
      payload.append("category", category || "")
      if (file !== null) payload.append("picture", file)
      const { data } = await put(url, payload, TOKEN)
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
      <ButtonInfo type="button" onClick={openModal}>
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 111.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </ButtonInfo>

      <Modal isShow={isShow} onClose={() => setIsShow(false)}>
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Update Menu</h2>
                <p className="text-sm text-gray-500">Edit the details of this menu item</p>
              </div>
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setIsShow(false)}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-4 space-y-4">
            <InputGroupComponent
              id="name"
              type="text"
              value={menu.name}
              onChange={(val) => setMenu({ ...menu, name: val })}
              required={true}
              label="Name"
            />
            <InputGroupComponent
              id="price"
              type="number"
              value={menu.price?.toString() ?? "0"}
              onChange={(val) => setMenu({ ...menu, price: Number(val) || 0 })}
              required={true}
              label="Price"
            />
            <InputGroupComponent
              id="description"
              type="text"
              value={menu.description}
              onChange={(val) => setMenu({ ...menu, description: val })}
              required={true}
              label="Description"
            />
            <Select
              id="category"
              value={menu.category}
              label="Category"
              required={true}
              onChange={(val) => setMenu({ ...menu, category: val })}
            >
              <option value="">--- Select Category ---</option>
              <option value="FOOD">Food</option>
              <option value="SNACK">Snack</option>
              <option value="DRINK">Drink</option>
            </Select>
            <FileInput
              acceptTypes={["image/png", "image/jpeg", "image/jpg"]}
              id="menu_picture"
              label="Upload New Picture (Max 2MB, JPG/JPEG/PNG)"
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
              Cancel
            </ButtonDanger>
            <ButtonPrimary type="submit">Update</ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EditMenu


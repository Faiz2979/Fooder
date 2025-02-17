"use client"

import { removeCookie } from "@/lib/client-cookies"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { type ReactNode, useState } from "react"
import MenuItem from "./menuItem"

type MenuType = {
  id: string
  icon: ReactNode
  path: string
  label: string
}

type SidebarProps = {
  children: ReactNode
  id: string
  title: string
  menuList: MenuType[]
}

const Sidebar = ({ children, id, title, menuList }: SidebarProps) => {
  const router = useRouter()
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    console.log("Logout")
    removeCookie("token")
    removeCookie("id")
    removeCookie("name")
    removeCookie("role")
    router.push(`/login`)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-600 text-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isShow ? "translate-x-0" : "-translate-x-full"} fixed lg:static lg:translate-x-0 z-50`}
      >
        <div className="p-4 border-b border-blue-500">
          <div className="flex items-center justify-center space-x-2">
            <Image src="/ewing.jpg" alt="Logo" width={40} height={40} className="rounded-full" />
            <h1 className="text-2xl font-bold">Fooder</h1>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="mt-5 px-2">
            {menuList.map((menu, index) => (
              <MenuItem
                key={`keyMenu${index}`}
                icon={menu.icon}
                label={menu.label}
                path={menu.path}
                active={menu.id === id}
              />
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-blue-500">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
          >
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={() => setIsShow(!isShow)} className="text-gray-500 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
              <h1 className="ml-2 font-semibold text-xl text-gray-800">{title}</h1>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Image src="/ewing.jpg" alt="Profile" width={32} height={32} className="rounded-full" />
                <span className="hidden md:inline font-medium">Manager Name</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default Sidebar


import type { IMenu } from "@/app/types"
import AlertInfo from "@/components/Alert"
import { BASE_API_URL, BASE_IMAGE_MENU } from "@/global"
import { get } from "@/lib/api-bridge"
import { getCookies } from "@/lib/server-cookies"
import Image from "next/image"
import type React from "react"
import AddMenu from "./addMenu"
import DeleteMenu from "./deleteMenu"
import EditMenu from "./editMenu"
import Search from "./search"

const getMenu = async (search: string): Promise<IMenu[]> => {
  try {
    const TOKEN = await getCookies("token")
    const url = `${BASE_API_URL}/menu?search=${search}`
    const { data } = await get(url, TOKEN)
    let result: IMenu[] = []
    if (data?.status) result = [...data.data]
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

const MenuPage = async ({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) => {
  const search = typeof searchParams?.search === "string" ? searchParams.search : ""
  const menu: IMenu[] = await getMenu(search)

  const category = (cat: string): React.ReactNode => {
    const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full"
    switch (cat) {
      case "FOOD":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`}>Food</span>
        )
      case "SNACK":
        return (
          <span className={`${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300`}>
            Snack
          </span>
        )
      default:
        return (
          <span className={`${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300`}>
            Drink
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen">
      <div className=" mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden  sm:rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Menu Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your restaurant's menu items, including adding new dishes, editing existing ones, and removing
                outdated items.
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full sm:w-2/3">
                  <Search url={`/manager/menu`} search={search} />
                </div>
                <div>
                  <AddMenu />
                </div>
              </div>

              {menu.length === 0 ? (
                <AlertInfo title="No Menu Items Found">
                  <p>There are currently no menu items available. Use the 'Add Menu' button to create new items.</p>
                </AlertInfo>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Item
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {menu.map((item, index) => (
                        <tr key={`keyMenu${index}`} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <Image
                                  width={100}
                                  height={100}
                                  src={`${BASE_IMAGE_MENU}/${item.picture}`}
                                  className="h-10 w-10 rounded-full object-cover"
                                  alt={item.name}
                                  unoptimized
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.price < 1000 ? `Rp ${item.price}` : `Rp ${item.price / 1000}K`}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{category(item.category)}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{item.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <EditMenu selectedMenu={item} />
                              <DeleteMenu selectedMenu={item} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPage


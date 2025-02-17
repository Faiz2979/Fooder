import type { IUser } from "@/app/types"
import AlertInfo from "@/components/Alert"
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global"
import { get } from "@/lib/api-bridge"
import { getCookies } from "@/lib/server-cookies"
import Image from "next/image"
import AddUser from "./addUser"
import DeleteUser from "./deleteUser"
import EditUser from "./editUser"
import Search from "./search"

const getUser = async (search: string): Promise<IUser[]> => {
  try {
    const TOKEN = await getCookies("token")
    const url = `${BASE_API_URL}/user?search=${search}`
    const { data } = await get(url, TOKEN)
    let result: IUser[] = []
    if (data?.status) result = [...data.data]
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

const UserPage = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const search = typeof searchParams?.search === "string" ? searchParams.search : ""
  const users: IUser[] = await getUser(search)

  return (
    <div className="">
      <div className="sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden sm:rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">User Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage user accounts, including adding new users, editing existing ones, and removing outdated accounts.
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full sm:w-2/3">
                  <Search url={`/manager/user`} search={search} />
                </div>
                <div>
                  <AddUser />
                </div>
              </div>

              {users.length === 0 ? (
                <AlertInfo title="No Users Found">
                  <p>There are currently no users available. Use the 'Add User' button to create new accounts.</p>
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
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created At
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
                      {users.map((user, index) => (
                        <tr key={`userKey${index}`} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image
                                  width={40}
                                  height={40}
                                  src={`${BASE_IMAGE_PROFILE}/${user.profile_picture}`}
                                  className="h-10 w-10 rounded-full object-cover"
                                  alt={user.name}
                                  unoptimized
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <EditUser selectedUser={user} />
                              <DeleteUser selectedUser={user} />
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

export default UserPage


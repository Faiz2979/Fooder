import AlertInfo from "@/components/Alert"
import { cookies } from "next/headers"

const DashboardPage = async () => {
    
    const userCookie = (await cookies()).get("name")
    const roleCookie = (await cookies()).get("role")
    const user = userCookie ? userCookie.value : "Guest"
    const role = roleCookie ? roleCookie.value : "Guest"

    return (
        <div className="flex min-h-screen bg-gray-100 text-black font-bold">
            <h1>Dashboard</h1>
            <br />


            <div className="flex justify-center w-full p-2 m-4 text-center">
                <AlertInfo title={""}>
                    <h2>Welcome to Cashier Dashboard Page {user}</h2>
                    <h2>Your role is {role}</h2>
                </AlertInfo>
            </div>
        </div>
    )
}
export default DashboardPage

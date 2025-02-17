'use client'
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const UnauthorizedPage = () => {

    const router=useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000)
    },[])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Unauthorized Access</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sorry, you don't have permission to access this page.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-sm text-center">
            <Link
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage


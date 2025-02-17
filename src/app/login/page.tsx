"use client"

import { BASE_API_URL } from "@/global"
import { setCookie } from "@/lib/client-cookies"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const url = `${BASE_API_URL}/user/login`
      const payload = JSON.stringify({ email: email, password })
      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      })
      if (data.status == true) {
        toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
        setCookie("token", data.token)
        setCookie("id", data.data.id)
        setCookie("name", data.data.name)
        setCookie("role", data.data.role)
        const role = data.data.role
        if (role === `MANAGER`) setTimeout(() => router.replace(`/manager/dashboard`), 1000)
        else if (role === `CASHIER`) setTimeout(() => router.replace(`/cashier/dashboard`), 1000)
      } else toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "warning" })
    } catch (error) {
      console.log(error)
      toast(`Something wrong`, { hideProgressBar: true, containerId: `toastLogin`, type: "error" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex justify-center items-center p-4">
      <ToastContainer containerId={`toastLogin`} />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">FOODER</h2>
            <p className="text-gray-600">Food Ordering System App</p>
          </div>
          <Image
            alt="fooder-logo"
            width={120}
            height={120}
            src={`/ewing.jpg`}
            className="mx-auto rounded-full shadow-md mb-8"
          />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password-industri-app"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <small className="text-gray-600">Copyright @2024</small>
        </div>
      </div>
    </div>
  )
}

export default LoginPage


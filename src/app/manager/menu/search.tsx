"use client"

import { useRouter } from "next/navigation"
import { type KeyboardEvent, useState } from "react"

type Props = {
  url: string
  search: string
}

const Search = ({ url, search }: Props) => {
  const [keyword, setKeyword] = useState<string>(search)
  const router = useRouter()

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      router.push(`${url}?search=${encodeURIComponent(keyword)}`)
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        id="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
        className="w-full px-4 py-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search menu items..."
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
  )
}

export default Search


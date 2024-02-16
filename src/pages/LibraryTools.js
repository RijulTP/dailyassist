/* eslint-disable @next/next/link-passhref */
"use client"
import Link from "next/link"

export default function LibraryTools() {
  //const searchParams = useSearchParams()
  //const branchname = searchParams.get('branch')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex mt-8 flex-wrap justify-center">
        <Link
          className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-70 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
          href={{
            pathname: "/AddBooks",
          }}
        >
          <img
            src="/BookAdd.png"
            className="w-full h-auto object-contain rounded-lg"
            alt="Add Books"
          />
          <p className="mt-4 text-xl md:text-2xl text-center text-gray-800 font-bold">
            Add Books
          </p>
        </Link>


        <Link
          className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-70 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
          href={{
            pathname: "/AddMembers",
          }}
        >
          <img
            src="/memberadd.png"
            className="w-full h-auto object-contain rounded-lg"
            alt="Add Members"
          />
          <p className="mt-4 text-xl md:text-2xl text-center text-gray-800 font-bold">
            Add Members
          </p>
        </Link>

        <Link
          className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-70 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
          href={{
            pathname: "/BorrowView",
          }}
        >
          <img
            src="/borrow.png"
            className="w-full h-auto object-contain rounded-lg"
            alt="Add Books"
          />
          <p className="mt-4 text-xl md:text-2xl text-center text-gray-800 font-bold">
            View borrowers
          </p>
        </Link>

        <Link
          className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-70 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
          href={{
            pathname: "/MemberView",
          }}
        >
          <img
            src="/member.png"
            className="w-full h-auto object-contain rounded-lg"
            alt="Add Members"
          />
          <p className="mt-4 text-xl md:text-2xl text-center text-gray-800 font-bold">
            View Members
          </p>
        </Link>
      </div>
    </div>
  )
}

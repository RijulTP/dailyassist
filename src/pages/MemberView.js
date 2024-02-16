import React, { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faPen, faTimes } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

const MemberView = () => {
  const [borrowList, setBorrowList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [returnStatus,setReturnStatus] = useState(false)

  useEffect(() => {
    console.log("Updating feed")
    fetch("http://localhost:8000/memberview")
      .then((response) => response.json())
      .then((data) => setBorrowList(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [returnStatus])

  useEffect(()=>{
    console.log("Borrow list is",borrowList)

  },[borrowList])

  const BookFeed = ({ borrowList, searchQuery }) => {
    const fuse = new Fuse(borrowList, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
    })

    const searchResults = searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : borrowList

    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Member list
        </h1>
        <ul>
          {searchResults.map((borrowItem) => (
            <li key={borrowItem.id} className="border rounded-md p-4 mb-4 shadow-md flex justify-between items-center relative">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                <strong>Member ID:</strong> {borrowItem.member_id}
              </p>
              <p className="text-gray-600">
                <strong>Member Name:</strong> {borrowItem.name}
              </p>
              <p className="text-indigo-600">
                <strong>Address:</strong> {borrowItem.address}
              </p>
              <p className="text-indigo-600">
                <strong>Member joining date</strong> {borrowItem.Memb_date}
              </p>
              <p className="text-indigo-600">
                <strong>Member expiry date</strong> {borrowItem.Exp_date}
              </p>
            </div>
          </li>
          
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full px-4 lg:px-8">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-3 mb-6 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BookFeed borrowList={borrowList} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default MemberView

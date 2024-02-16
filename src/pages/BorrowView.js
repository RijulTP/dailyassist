import React, { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faPen, faTimes } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

const BookView = () => {
  const [borrowList, setBorrowList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [returnStatus,setReturnStatus] = useState(false)

  useEffect(() => {
    console.log("Updating feed")
    fetch("http://localhost:8000/borrowview")
      .then((response) => response.json())
      .then((data) => setBorrowList(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [returnStatus])

  const handleReturn = (borrow_id) => {
    let returnData = {"borrow_id":borrow_id}
    fetch("http://localhost:8000/returnbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(returnData),
    })
      .then(() => {
        console.log("API call successful")
        setReturnStatus(!returnStatus)
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("API error:", error)
      })
  }

  const BookFeed = ({ borrowList, searchQuery }) => {
    const fuse = new Fuse(borrowList, {
      keys: ["title"],
      includeScore: true,
      threshold: 0.3,
    })

    const searchResults = searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : borrowList

    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Books borrowed
        </h1>
        <ul>
          {searchResults.map((borrowItem) => (
            <li key={borrowItem.id} className="border rounded-md p-4 mb-4 shadow-md flex justify-between items-center relative">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                <strong>Title:</strong> {borrowItem.title}
              </p>
              <p className="text-gray-600">
                <strong>Member ID:</strong> {borrowItem.member_id}
              </p>
              <p className="text-indigo-600">
                <strong>Member Name:</strong> {borrowItem.member_name}
              </p>
              <p className="text-indigo-600">
                <strong>Issue Date:</strong> {borrowItem.issue_date}
              </p>
              <p className="text-indigo-600">
                <strong>Due Date:</strong> {borrowItem.due_date}
              </p>
              {borrowItem.return_date !== "None" ? (
                <p className="text-indigo-600">
                  <strong>Return Date:</strong> {borrowItem.return_date}
                </p>
              ) : (
                <p className="italic text-gray-500">Not yet returned</p>
              )}
            </div>
          
            {borrowItem.return_date !== "None" ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-md absolute right-4">
                Returned
              </div>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 absolute right-4"
                onClick={() => handleReturn(borrowItem.borrow_id)}
              >
                Mark as returned
              </button>
            )}
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
          placeholder="Search by title..."
          className="border p-3 mb-6 mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BookFeed borrowList={borrowList} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default BookView

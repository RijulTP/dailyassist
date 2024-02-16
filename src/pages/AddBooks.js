"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Select from "react-select"
export default function AddBooks() {
  const [books, setbooks] = useState([
    { book_name: "", author_name: "", price: "", publisher: "" },
  ])
  const [alert, setAlert] = useState(null)
  const [publisherList, setPublisherList] = useState([])
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const updatedBooks = [...books]
    updatedBooks[index][name] = value
    setbooks(updatedBooks)
  }

  const handlePublisherChange = (index, selectedOption) => {
    const updatedBooks = [...books]
    updatedBooks[index].publisher = selectedOption
    setbooks(updatedBooks)
  }



  useEffect(() => {
    fetch("http://localhost:8000/viewpublishers")
      .then((response) => response.json())
      .then((data) => {
        setPublisherList(data)
      })
      .catch((error) => {
        console.error("Error fetching college list:", error)
      })
  }, [])

  const handleSubmit = () => {
    const convertedData = {}
    books.forEach((book, index) => {
      const bookKey = `book${index + 1}`
      convertedData[bookKey] = book
    })
    if(books[0].book_name!=""){
      console.log("Converted data is",convertedData,books)

    console.log("The data to be submitted is", convertedData)

    fetch("http://localhost:8000/addbooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(convertedData),
    })
      .then(() => {
        console.log("API call successful")
        setAlert({ type: "success", message: "Book added successfully" })
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("API error:", error)
        setAlert({ type: "error", message: "Error occured, please try again" })
      })
    }
    else{
      setAlert({ type: "error", message: "Data not entered properly" })

    }
    
  }

  useEffect(() => {
    let alertTimer

    if (alert) {
      alertTimer = setTimeout(() => {
        setAlert(null) // Clear the alert after 5 seconds
      }, 5000)
    }

    return () => clearTimeout(alertTimer) // Clear the timer when component unmounts
  }, [alert])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full px-4 lg:px-8">
        <h1 className="title text-3xl font-bold mb-4">Add new Book</h1>
        {alert && (
          <div
            className={`${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white px-4 py-2 mb-4 rounded`}
          >
            {alert.message}
          </div>
        )}
        <div className="table-container shadow-md p-4 w-full lg:w-2/3">
          <table className="college-table w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Author Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Publisher</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="table-td">
                    <input
                      type="text"
                      name="book_name"
                      value={book.book_name}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="eg:- Introduction to SQL"
                      className="input-field w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="table-td">
                    <input
                      type="text"
                      name="author_name"
                      value={book.author_name}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="Behrouz A. Forouzan"
                      className="input-field w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="table-td">
                    <input
                      type="text"
                      name="price"
                      value={book.price}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="1000"
                      className="input-field w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="table-td">
                    <Select
                      name="publisher_name"
                      value={book.publisher} // Update value format as an object with label and value properties
                      onChange={(selectedOption) =>
                        handlePublisherChange(index, selectedOption)
                      } // Pass the selected option directly
                      options={publisherList.map((publisher) => ({
                        value: publisher.publisher_id,
                        label: publisher.publisher_name,
                      }))}
                      className="select-field"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="submit-container mt-4">
          <button
            className={`submit-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isSubmitDisabled
                ? "opacity-50 cursor-not-allowed bg-gray-500 hover:bg-gray-600"
                : ""
            }`}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

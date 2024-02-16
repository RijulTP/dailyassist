import React, { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook, faPen, faTimes,faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"

const BookView = () => {
  const [books, setBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleted, setDeleted] = useState(true)
  const [publisherList, setPublisherList] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/libraryview")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [deleted])

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

  const BookFeed = ({ books, searchQuery }) => {
    const fuse = new Fuse(books, {
      keys: ["title"],
      includeScore: true,
      threshold: 0.3,
    })
    const handleDelete = (book_id) => {
      const post_data = {}
      post_data["book_id"] = book_id
      fetch("http://localhost:8000/deletebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
      })
        .then(() => {
          console.log("API call successful")
          setDeleted(!deleted)
        })
        .catch((error) => {
          // Handle any errors that occur during the API call
          console.error("API error:", error)
          setAlert({
            type: "error",
            message: "Error occured, please try again",
          })
        })
    }

    const [editingBook, setEditingBook] = useState(null)

    const [editedValues, setEditedValues] = useState({})

    const [borrowingBook, setBorrowingBook] = useState(null)
    const [borrowValue, setBorrowValue] = useState(null)

    const handleEdit = (book) => {
      setEditingBook(book.book_id)
      setEditedValues(book)
    }

    const handleBorrow = (book) => {
      setBorrowingBook(book.book_id)
    }

    const handleEditChange = (field, value) => {
      // Update the editedValues state when input values change
      let newEditedValues = { ...editedValues }
      newEditedValues[field] = value
      setEditedValues(newEditedValues)
    }

    const handleBorrowChange = (value) => {
      console.log("Setting borrow value to", value)
      setBorrowValue(value)
    }

    const handleSave = () => {
      fetch("http://localhost:8000/updatebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedValues),
      })
        .then(() => {
          console.log("API call successful")
          setDeleted(!deleted)
        })
        .catch((error) => {
          // Handle any errors that occur during the API call
          console.error("API error:", error)
          setAlert({
            type: "error",
            message: "Error occured, please try again",
          })
        })

      console.log("API call with updated values:", editedValues)

      // After API call, set editingBook back to null to exit edit mode
      setEditingBook(null)
    }

    const submitBorrow = (book_id) => {
      let borrowData = {
        book_id: book_id,
        member_id: borrowValue,
        staff_id: 1,
      }
      fetch("http://localhost:8000/submitborrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      })
        .then(() => {
          console.log("API call successful")
        })
        .catch((error) => {
          // Handle any errors that occur during the API call
          console.error("API error:", error)
          setAlert({
            type: "error",
            message: "Error occured, please try again",
          })
        })

      console.log("API call with borrow:", borrowValue)
      setBorrowingBook(null)
    }

    const handlePublisherChange = (selectedOption) => {
      let newEditedValues = { ...editedValues }
      newEditedValues.publisher = selectedOption
      setEditedValues(newEditedValues)
    }

    const searchResults = searchQuery
      ? fuse.search(searchQuery).map((result) => result.item)
      : books

    return (
      <div>
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Book Feed</h1>
        {searchResults.length === 0 ? (
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-black-500 mr-2"
              style={{ fontSize: "2em" }}
            />
            <p className="text-xl font-semibold text-black-500">No books found</p>
          </div>
        ) : (
          <ul>
            {searchResults.map((book) => (
              <li
                key={book.id}
                className="border rounded-md p-4 mb-4 shadow-md bg-white flex justify-between items-center"
              >
                {editingBook === book.book_id ? (
                  // Render input fields for editing with labels
                  <div class="p-4 rounded-md">
                    <div class="mb-4">
                      <label class="block text-lg font-semibold mb-2">
                        Title:
                        <input
                          class="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedValues.title}
                          onChange={(e) =>
                            handleEditChange("title", e.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div class="mb-4">
                      <label class="block text-lg font-semibold mb-2">
                        Author:
                        <input
                          class="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedValues.author}
                          onChange={(e) =>
                            handleEditChange("author", e.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div class="mb-4">
                      <label class="block text-lg font-semibold mb-2">
                        Price:
                        <input
                          class="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                          type="text"
                          value={editedValues.price}
                          onChange={(e) =>
                            handleEditChange("price", e.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div class="mb-4">
                      <label class="block text-lg font-semibold mb-2">
                        publisher_name
                        <Select
                          name="publisher_name"
                          value={editedValues.publisher} // Update value format as an object with label and value properties
                          onChange={(selectedOption) =>
                            handlePublisherChange(selectedOption)
                          } // Pass the selected option directly
                          options={publisherList.map((publisher) => ({
                            value: publisher.publisher_id,
                            label: publisher.publisher_name,
                          }))}
                          className="select-field"
                        />
                      </label>
                    </div>

                    <button
                      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleSave(book.book_id, book)}
                    >
                      Save
                    </button>
                  </div>
                ) : borrowingBook === book.book_id ? (
                  // Render div for borrowing
                  <div class="p-4 rounded-md">
                    <div class="p-4 rounded-md bg-white ">
                      <div class="mb-4">
                        <p class="text-lg font-semibold mb-2">
                          Borrowing {book.title}
                        </p>
                        <label class="block text-gray-700 text-sm mb-2">
                          Member ID
                          <input
                            class="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            type="text"
                            value={borrowValue}
                            onChange={(e) => handleBorrowChange(e.target.value)}
                          />
                        </label>
                      </div>
                      <button
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                        onClick={() => submitBorrow(book.book_id)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  // Render book details when not in edit mode
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      <strong>Title:</strong> {book.title}
                    </p>
                    <p className="text-gray-600">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="text-green-600">
                      <strong>Price:</strong> {book.price}
                    </p>
                  </div>
                )}
                <div className="flex items-center">
                  {/* Cross icon for deleting */}
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-blue-500 cursor-pointer mr-4"
                    style={{ fontSize: "1.5em" }}
                    onClick={() => handleBorrow(book)}
                  />

                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 cursor-pointer mr-4"
                    style={{ fontSize: "1.5em" }}
                    onClick={() => handleDelete(book.book_id)}
                  />

                  {/* Pen icon for updating */}
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-black-500 cursor-pointer"
                    style={{ fontSize: "1.5em", marginLeft: "8px" }}
                    onClick={() => handleEdit(book)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
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
        <BookFeed books={books} searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default BookView

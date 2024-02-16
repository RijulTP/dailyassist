"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Select from "react-select"

import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});


export default function AddMembers() {
  const [books, setbooks] = useState([{ member_name: "", member_address: "" }])

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const updatedBooks = [...books]
    updatedBooks[index][name] = value
    setbooks(updatedBooks)
  }

  const handleSubmit = () => {
    const convertedData = {}
    books.forEach((book, index) => {
      const bookKey = `book${index + 1}`
      convertedData[bookKey] = book
    })
    if (books[0].member_name != "") {
      console.log("Converted data is", convertedData, books)

      console.log("The data to be submitted is", convertedData)

      fetch("http://localhost:8000/addmembers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
      })
        .then(() => {
          console.log("API call successful")
          success({
            text: "Member added successfully",
            delay: 1000
          });
        })
        .catch((error) => {
          // Handle any errors that occur during the API call
          console.error("API error:", error)
          error({
            text: "Error while adding member",
            delay: 1000
          });
        })
    } else {
      info({
        text: "Data not entered properly",
        delay: 1000
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full px-4 lg:px-8">
        <h1 className="title text-3xl font-bold mb-4">Add new member</h1>
        <div className="table-container shadow-md p-4 w-full lg:w-2/3">
          <table className="college-table w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="table-td">
                    <input
                      type="text"
                      name="member_name"
                      value={book.member_name}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="eg:- Nipun"
                      className="input-field w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="table-td">
                    <input
                      type="text"
                      name="member_address"
                      value={book.member_address}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="Wandoor, Malappuram"
                      className="input-field w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
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

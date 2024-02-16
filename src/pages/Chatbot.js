"use client"
import React, { useState } from "react"
import { OpenAI } from "openai"

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const sendMessage = async () => {
    console.log("Sending ")

    setIsLoading(false)
  }

  return (
    <div className="chatbot bg-gray-800 rounded-lg shadow-lg p-4 w-100">
      <div className="messages mb-4 max-h-48 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser
                ? "text-right text-white"
                : "text-left text-gray-200"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input flex items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 py-2 px-3 rounded-l-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="py-2 px-4 rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot

import { useEffect, useRef, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import InputBox from "./InputBox"

const API_KEY = "AIzaSyBmrOh1cZRZIEtznQSsUTqY13isfsfXCCA"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

const Header = () => {
  return (
    <div className="header">
      <h1 id="chat-header" className="text-lg font-bold ml-2">
        Daily Assist Bot
      </h1>
      <small className="block">Chat with daily assist bot</small>
    </div>
  )
}

const ChatBot = () => {
  const chatContainerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  // useEffect(() => {
  //   chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  // }, [messages]);

  const sendMessage = async (inputText) => {
    if (!inputText) return

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ])

    setLoading(true)

    try {
      const result = await model.generateContent(inputText)
      const text = await result.response.text()

      const isCode = text.includes("```")

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode,
        },
      ])

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("generateContent error: ", error)
    }
  }

  return (
    <div className=" fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      {" "}
      <div className="mx-auto flex flex-col flex-1">
        <Header />
        <div className="chat-container flex flex-col flex-grow overflow-auto py-4 px-6 md:px-12 lg:px-20 xl:px-32">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user"
                  ? "self-end bg-blue-800"
                  : "self-start bg-green-900"
              } text-gray-200 p-3 mb-4 rounded-xl max-w-md`}
            >
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto">
        <InputBox sendMessage={sendMessage} loading={loading} />
      </div>
    </div>
  )
}
export default ChatBot

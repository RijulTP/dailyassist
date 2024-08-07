import { useEffect, useRef, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import InputBox from "./InputBox"
import ReactMarkdown from "react-markdown"
import axios from "axios"


// const OPENAI_KEY = "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"
// const speak = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text)
//   window.speechSynthesis.speak(utterance)
// }
const API_KEY = "AIzaSyBmrOh1cZRZIEtznQSsUTqY13isfsfXCCA"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })


const speakText = async (text) => {
  try {
    // Speak the provided text
    await Speech.speak(text, {
      language: 'en-US', // Adjust language as needed (see Expo Speech docs)
      pitch: 1, // Adjust pitch (1.0 is normal)
      rate: 1, // Adjust speaking rate (1.0 is normal)
    });
  } catch (error) {
    console.error('Error speaking:', error);
  }
};

// Usage example in your component
const handleClick = async () => {
  const textToSpeak = 'This is a test message for Text-to-Speech.';
  await speakText(textToSpeak);
};


const Header = () => {
  return (
    <div className="header">
      <h1 id="chat-header" className="text-lg font-bold ml-2">
        Life Navigator Bot
      </h1>
      <small className="block">Chat with Life Navigator bot</small>
    </div>
  )
}

const identifyIntentQuery =
  'I want you to analyze this message and identify the intent, These are the possible intents 1.add_tasks 2.view_tasks 3.other_tasks, Reply with following JSON format {"intent":"intent_name","intent_task":"intent_task"}'

const ChatBot = () => {
  const chatContainerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Function to run once on starting the bot
    const initialInstructions =
      "I want you to act as a personal productivity and wellbeing manager, and your name will be Life Navigator bot, When someone asks your name it should be Life Navigator bot. Now Greet the user in a breif way"
    sendInitialMessage(initialInstructions)
  }, []) // Empty dependency array ensures this runs only once on component mount

  const sendInitialMessage = async (initialInstructions) => {
    try {
      let sample_text = "Hello there"
      speak(sample_text)
      const result = await model.generateContent(initialInstructions)
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
    } catch (error) {
      console.error("generateContent error: ", error)
    }
  }

  const sendMessage = async (inputText) => {
    if (!inputText) return

    let modifiedInputText = identifyIntentQuery + " " + inputText
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ])

    setLoading(true)

    try {
      let result = await model.generateContent(modifiedInputText)
      let text = await result.response.text()

      const isCode = text.includes("```")
      if (
        text.indexOf("add_tasks") !== -1 ||
        text.indexOf("view_tasks") !== -1
      ) {
        console.log("String contains intent", text)
        const resultObject = JSON.parse(text)
        console.log("The intent object is", resultObject)
        let job_name = resultObject["intent"]
        let job_params = resultObject["intent_task"]

        if (job_name === "add_tasks") {
          console.log("executing job: AddTask, With Params", job_params)
          text =
            "I have added the task: " + job_params + " Let's get it done soon!"
        } else {
          console.log("executing job: ViewTask, With Params", job_params)
          text = "Here are the tasks"
        }
      } else {
        console.log("String does not contain intent")
        result = await model.generateContent(inputText)
        text = await result.response.text()
      }
      // speak(text)
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
    <div className="fixed inset-0 flex bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="w-64 bg-gray-900 hidden md:block"></div>
      <div className="flex flex-col flex-1 overflow-hidden w-full md:w-auto">
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-4">
          <Header />
        </div>

        <div className="flex flex-1 flex-col justify-end px-6 md:px-12 lg:px-20 xl:px-32 py-4 overflow-y-auto">
          <div className="flex flex-col space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user"
                    ? "self-end bg-blue-800"
                    : "self-start bg-green-900"
                } text-gray-200 p-3 rounded-xl max-w-md`}
              >
                {message.isCode ? (
                  <pre className="message-text">
                    <code>{message.text}</code>
                  </pre>
                ) : (
                  <ReactMarkdown className="message-text">
                    {message.text}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>
          <div className="input-box-container mt-4">
            <InputBox sendMessage={sendMessage} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatBot

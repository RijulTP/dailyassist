import { useState } from "react"

const InputBox = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("")

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      sendMessage(input)
      setInput("")
    }
  }

  return (
    <div className="input-box mt-4 relative">
      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="animate-spin h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0113.5 1h-3A1.5 1.5 0 019 2.5V4a8 8 0 00-4.8 14.4l1.6-1.2A5.3 5.3 0 019 12V9.5a1.5 1.5 0 113 0V12a8 8 0 01-4.8 7.4l1.6 1.2A10 10 0 0014 4.4V2.5A1.5 1.5 0 0012.5 1h-3A1.5 1.5 0 008 2.5V4a8 8 0 014 8v2.5a1.5 1.5 0 11-3 0V12z"
            ></path>
          </svg>
        </div>
      )}
      <input
        disabled={loading}
        type="text"
        className="w-full form-control bg-black py-2 pl-10 pr-4 rounded-full outline-none placeholder-gray-500 focus:placeholder-gray-400 focus:bg-gray-900"
        placeholder={loading ? "Loading..." : "Type a message..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default InputBox

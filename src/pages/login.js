"use client"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

// import {
//   alert,
//   notice,
//   info,
//   success,
//   error,
//   defaultModules,
// } from "@pnotify/core"
// import "@pnotify/core/dist/PNotify.css"
// import * as PNotifyMobile from "@pnotify/mobile"
// import "@pnotify/mobile/dist/PNotifyMobile.css"
// import "@pnotify/core/dist/BrightTheme.css"
// defaultModules.set(PNotifyMobile, {})

import { useDispatch } from "react-redux"

import { updateLoggedInUser } from "@/redux/userslice"

export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogin = async () => {
    // router.push("/DAHomePage")
    try {
      const response = await fetch(`http://localhost:8000/dailyassist/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })

      const data = await response.json() // Parse the JSON response

      if (data.success) {
        // Check for success field in the response
        // Login successful
        dispatch(updateLoggedInUser(username))
        router.push("/DAHomePage")
      } else {
        // Login failed
        console.log(
          "Login failed:",
          data.message || "Login failed (no message provided)"
        )
        // Handle login error display (consider using a state variable for the alert)
        // setAlert({ type: "failed", message: data.message || "Login failed" }); // Example using state
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  const passwordInputRef = useRef(null)

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
    // Manually set focus on password input after toggle button is clicked
    passwordInputRef.current.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-md p-6 bg-white rounded-lg mx-auto">
        <h1 className="text-6xl text-gray-800 font-bold mb-10 text-center">
          Welcome to Life Navigator
        </h1>
        <div className="grid gap-4 mb-4">
          <label htmlFor="username" className="text-lg text-gray-500">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <label htmlFor="password" className="text-lg text-gray-500">
            Password:
          </label>
          <div className="relative">
            <input
              ref={passwordInputRef} // Set the reference for the password input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input rounded-md border border-gray-300 bg-white px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0  flex items-center"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="login-button bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
        >
          Login
        </button>
      </div>
    </div>
  )
}

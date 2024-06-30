"use client"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { setLoggedInUser, setUserId, setLoginStatus } from "../redux/authSlice" // Import actions
import { useSelector } from "react-redux"

const HOST_LOCAL = "http://localhost:8000"
const HOST_PROD = "https://dailyassist-backend.vercel.app"

// const HOST_PROD = "http://localhost:8000"

export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loggedInUser = useSelector((state) => state.auth.loggedInUser) // Access username from store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) // Access login status
  const userId = useSelector((state) => state.auth.userId) // Access user ID from store
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter()
  if(isLoggedIn == true){
    router.push("/DAHomePage")
  }

  console.log("The redux values are", loggedInUser, isLoggedIn, userId)


  const handleLogin = async () => {
    try {
      const response = await fetch(`${HOST_PROD}/dailyassist/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json() // Parse the JSON response

      if (data.success) {
        console.log("Login successful")
        console.log("The username is", username)
        dispatch(setLoginStatus(true)) // Dispatch action to update login status
        dispatch(setLoggedInUser(username))

        // dispatch(setUserId(data.userId)) // Set user ID from response (assuming response has userId)
        router.push("/DAHomePage")
      } else {
        console.log(
          "Login failed:",
          data.message || "Login failed (no message provided)"
        )
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  }

  const handleRegister = async () => {
    try {
      const response = await fetch(`${HOST_PROD}/dailyassist/add_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, user_type: "user" }),
      });
      const data = await response.json(); // Parse the JSON response
      if (data.success) {
        console.log("Registration successful");
        setMessage("Registration successful");
        setIsError(false);
      } else {
        console.log(
          "Registration failed:",
          data.message || "Registration failed"
        );
        setMessage("Registration Failed");
        setIsError(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("Registration Failed")
      setIsError(true);
    }
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };
  

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
        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="login-button bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="register-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
          >
            Register
          </button>
        </div>
        {message && (
          <div
            className={`text-center px-4 py-3 mt-10 rounded ${
              isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
      
    </div>
  )
}

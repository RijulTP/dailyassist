import React, { useState, useEffect } from "react"
import UserList from "./UserList"

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch user data on component mount (replace with your actual API call)
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://127.0.0.1:8000/dailyassist/view_users") // Replace with your API endpoint
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-md"> 
        <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
      </div>
      <main className="flex-grow px-6 py-4">
        {isLoading && <div className="text-center">Loading users...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && <UserList users={users} />}
      </main>
    </div>
  )
}

export default AdminPage

"use client"

import { useState, useEffect } from "react"

export interface User {
  id: string
  username: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("admin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, password: string) => {
    // Dummy validation
    if (username && password) {
      const user: User = {
        id: "1",
        username,
        email: `${username}@easyqist.com`,
        name: username.charAt(0).toUpperCase() + username.slice(1),
      }
      setUser(user)
      localStorage.setItem("admin_user", JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("admin_user")
  }

  const updatePassword = (oldPassword: string, newPassword: string) => {
    // Dummy validation
    if (oldPassword && newPassword && oldPassword !== newPassword) {
      return true
    }
    return false
  }

  return { user, isLoading, login, logout, updatePassword }
}

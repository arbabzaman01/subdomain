"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    if (login(username, password)) {
      window.location.reload()
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <CardHeader className="space-y-2">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Easy Qist</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Admin Panel</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-medium text-foreground">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-medium text-foreground">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          {error && <p className="text-sm sm:text-base text-destructive">{error}</p>}
          <Button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-accent text-primary-foreground"
          >
            Login
          </Button>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-4">
            Demo: Use any username and password to login
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useAuth } from "@/hooks/use-auth"
import LoginPage from "@/components/login-page"
import AdminLayout from "@/components/admin-layout"

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <AdminLayout />
}

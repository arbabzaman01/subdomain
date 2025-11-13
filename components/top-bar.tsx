"use client"

import { useState } from "react"
import { LogOut, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface TopBarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function TopBar({ currentPage, setCurrentPage }: TopBarProps) {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      products: "Products",
      "installment-plans": "Installment Plans",
      carts: "Carts & Orders",
      settings: "Settings",
    }
    return titles[currentPage] || "Dashboard"
  }

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Admin Profile Section */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 hover:bg-sidebar p-2 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-border">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage("settings")
                  setShowProfileMenu(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-sidebar text-sm text-foreground flex items-center gap-2 transition-colors"
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-sm text-destructive flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LayoutDashboard, Package, Clock, ShoppingCart, Settings, LogOut, Menu } from "lucide-react"

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "installment-plans", label: "Installment Plans", icon: Clock },
    { id: "carts", label: "Carts / Orders", icon: ShoppingCart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-sidebar p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-primary">Easy Qist</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} className="text-sidebar-primary" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border hidden md:block">
          <h1 className="text-2xl font-bold text-sidebar-primary">Easy Qist</h1>
          <p className="text-xs text-sidebar-accent mt-1">Admin Panel</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm sm:text-base font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm sm:text-base font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 md:hidden z-40"></div>}
    </>
  )
}

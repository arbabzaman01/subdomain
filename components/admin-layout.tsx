"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/pages/dashboard"
import ProductsPage from "@/pages/products"
import InstallmentPlansPage from "@/pages/installment-plans"
import CartsPage from "@/pages/carts"
import SettingsPage from "@/pages/setting"
import TopBar from "@/components/top-bar"

export default function AdminLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "products":
        return <ProductsPage />
      case "installment-plans":
        return <InstallmentPlansPage />
      case "carts":
        return <CartsPage />
      case "settings":
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-auto bg-background p-6">{renderPage()}</main>
      </div>
    </div>
  )
}

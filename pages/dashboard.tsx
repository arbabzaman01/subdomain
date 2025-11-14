"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dummyProducts, dummyCarts } from "@/lib/dummy-data"
import { Package, ShoppingCart, TrendingUp, Zap } from "lucide-react"

const chartData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 5200, orders: 320 },
  { month: "Mar", revenue: 6800, orders: 420 },
  { month: "Apr", revenue: 5500, orders: 380 },
  { month: "May", revenue: 7200, orders: 510 },
  { month: "Jun", revenue: 8900, orders: 640 },
]

export default function Dashboard() {
  const activeCarts = dummyCarts.filter((c) => c.status === "pending").length
  const totalOrders = dummyCarts.length
  const totalRevenue = dummyCarts.reduce((sum, cart) => sum + cart.totalPrice, 0)

  const [chartHeight, setChartHeight] = useState(300)

  // Adjust chart height on window resize
  useEffect(() => {
    const updateHeight = () => setChartHeight(window.innerWidth < 640 ? 250 : 300)
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Products</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">{dummyProducts.length}</p>
              </div>
              <div className="bg-primary/20 p-2 sm:p-3 rounded-lg">
                <Package className="text-primary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Carts</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">{activeCarts}</p>
              </div>
              <div className="bg-accent/20 p-2 sm:p-3 rounded-lg">
                <ShoppingCart className="text-accent" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-accent/20 p-2 sm:p-3 rounded-lg">
                <TrendingUp className="text-accent" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 sm:mt-2">{totalOrders}</p>
              </div>
              <div className="bg-primary/20 p-2 sm:p-3 rounded-lg">
                <Zap className="text-primary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm sm:text-base">Revenue & Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #25253f",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#8b5cf6" />
              <Bar dataKey="orders" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

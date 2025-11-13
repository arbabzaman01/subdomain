"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModalDialog from "@/components/modal-dialog"
import { dummyCarts } from "@/lib/dummy-data"
import { Eye, CheckCircle, XCircle } from "lucide-react"

interface Cart {
  id: string
  userName: string
  product: string
  plan: string
  totalPrice: number
  addedAt: Date
  status: "pending" | "processed"
}

export default function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>(dummyCarts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null)

  const filteredCarts = useMemo(
    () =>
      carts.filter(
        (c) =>
          c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.product.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [carts, searchTerm],
  )

  const handleViewDetails = (cart: Cart) => {
    setSelectedCart(cart)
    setIsModalOpen(true)
  }

  const handleUpdateStatus = (id: string, newStatus: "pending" | "processed") => {
    setCarts(carts.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Input
            placeholder="Search by name or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {filteredCarts.length} | Pending: {filteredCarts.filter((c) => c.status === "pending").length}
        </div>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground">Carts & Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">User Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Plan</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Total Price</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCarts.map((cart) => (
                  <tr key={cart.id} className="border-b border-border hover:bg-sidebar">
                    <td className="py-3 px-4 text-foreground">{cart.userName}</td>
                    <td className="py-3 px-4 text-muted-foreground">{cart.product}</td>
                    <td className="py-3 px-4 text-muted-foreground">{cart.plan}</td>
                    <td className="py-3 px-4 text-foreground font-semibold">${cart.totalPrice}</td>
                    <td className="py-3 px-4 text-muted-foreground">{cart.addedAt.toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          cart.status === "processed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {cart.status === "processed" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {cart.status.charAt(0).toUpperCase() + cart.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetails(cart)}
                        className="p-2 hover:bg-sidebar rounded transition-colors"
                      >
                        <Eye size={16} className="text-accent" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ModalDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Order Details">
        {selectedCart && (
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">User Name</p>
              <p className="text-foreground font-semibold">{selectedCart.userName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Product</p>
              <p className="text-foreground font-semibold">{selectedCart.product}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Installment Plan</p>
              <p className="text-foreground font-semibold">{selectedCart.plan}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Price</p>
              <p className="text-foreground font-semibold text-lg">${selectedCart.totalPrice}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Added At</p>
              <p className="text-foreground font-semibold">{selectedCart.addedAt.toLocaleString()}</p>
            </div>
            <div className="flex gap-2 pt-4">
              {selectedCart.status === "pending" && (
                <Button
                  onClick={() => handleUpdateStatus(selectedCart.id, "processed")}
                  className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                >
                  Mark as Processed
                </Button>
              )}
              <Button onClick={() => setIsModalOpen(false)} className="flex-1 bg-muted hover:bg-border text-foreground">
                Close
              </Button>
            </div>
          </div>
        )}
      </ModalDialog>
    </div>
  )
}

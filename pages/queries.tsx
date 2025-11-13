"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModalDialog from "@/components/modal-dialog"
import { dummyQueries } from "@/lib/dummy-data"
import { Eye, CheckCircle, Clock } from "lucide-react"

interface Query {
  id: string
  name: string
  email: string
  phone: string
  message: string
  submittedAt: Date
  status: "open" | "resolved"
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>(dummyQueries)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)

  const filteredQueries = useMemo(
    () =>
      queries.filter(
        (q) =>
          q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [queries, searchTerm],
  )

  const handleViewDetails = (query: Query) => {
    setSelectedQuery(query)
    setIsModalOpen(true)
  }

  const handleUpdateStatus = (id: string, newStatus: "open" | "resolved") => {
    setQueries(queries.map((q) => (q.id === id ? { ...q, status: newStatus } : q)))
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {filteredQueries.length} | Open: {filteredQueries.filter((q) => q.status === "open").length}
        </div>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground">Customer Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Submitted</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueries.map((query) => (
                  <tr key={query.id} className="border-b border-border hover:bg-sidebar">
                    <td className="py-3 px-4 text-foreground">{query.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{query.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{query.phone}</td>
                    <td className="py-3 px-4 text-muted-foreground">{query.submittedAt.toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          query.status === "resolved"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {query.status === "resolved" ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetails(query)}
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

      <ModalDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Query Details">
        {selectedQuery && (
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="text-foreground font-semibold">{selectedQuery.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="text-foreground font-semibold">{selectedQuery.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="text-foreground font-semibold">{selectedQuery.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Message</p>
              <p className="text-foreground">{selectedQuery.message}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Submitted At</p>
              <p className="text-foreground font-semibold">{selectedQuery.submittedAt.toLocaleString()}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => handleUpdateStatus(selectedQuery.id, "resolved")}
                className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
              >
                Mark as Resolved
              </Button>
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

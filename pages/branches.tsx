"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModalDialog from "@/components/modal-dialog"
import { dummyBranches } from "@/lib/dummy-data"
import { Plus, MapPinIcon } from "lucide-react"

interface Branch {
  id: string
  name: string
  address: string
  phone: string
  mapLink: string
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>(dummyBranches)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    mapLink: "",
  })

  const handleOpenModal = (branch?: Branch) => {
    if (branch) {
      setEditingBranch(branch)
      setFormData({
        name: branch.name,
        address: branch.address,
        phone: branch.phone,
        mapLink: branch.mapLink,
      })
    } else {
      setEditingBranch(null)
      setFormData({ name: "", address: "", phone: "", mapLink: "" })
    }
    setIsModalOpen(true)
  }

  const handleSaveBranch = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all required fields")
      return
    }

    if (editingBranch) {
      setBranches(
        branches.map((b) =>
          b.id === editingBranch.id
            ? {
                ...b,
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                mapLink: formData.mapLink,
              }
            : b,
        ),
      )
    } else {
      const newBranch: Branch = {
        id: (Math.max(...branches.map((b) => Number.parseInt(b.id))) + 1).toString(),
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        mapLink: formData.mapLink,
      }
      setBranches([...branches, newBranch])
    }

    setIsModalOpen(false)
    setFormData({ name: "", address: "", phone: "", mapLink: "" })
  }

  const handleDeleteBranch = (id: string) => {
    if (confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter((b) => b.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-accent text-primary-foreground gap-2">
          <Plus size={20} />
          Add Branch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <Card key={branch.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <MapPinIcon size={20} />
                {branch.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">Address</p>
                <p className="text-foreground">{branch.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Phone</p>
                <p className="text-foreground">{branch.phone}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleOpenModal(branch)}
                  className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteBranch(branch.id)}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBranch ? "Edit Branch" : "Add Branch"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Branch Name</label>
            <Input
              type="text"
              placeholder="e.g., Main Branch"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Address</label>
            <Input
              type="text"
              placeholder="e.g., Riyadh, Saudi Arabia"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input
              type="tel"
              placeholder="e.g., +966-11-1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Map Link (optional)</label>
            <Input
              type="text"
              placeholder="e.g., https://maps.google.com/..."
              value={formData.mapLink}
              onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSaveBranch} className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
              {editingBranch ? "Update" : "Add"}
            </Button>
            <Button onClick={() => setIsModalOpen(false)} className="flex-1 bg-muted hover:bg-border text-foreground">
              Cancel
            </Button>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}

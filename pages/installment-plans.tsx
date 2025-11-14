"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModalDialog from "@/components/modal-dialog"
import { dummyInstallmentPlans } from "@/lib/dummy-data"
import { Plus } from "lucide-react"

interface InstallmentPlan {
  id: string
  months: number
  interestRate: number
  name: string
}

export default function InstallmentPlansPage() {
  const [plans, setPlans] = useState<InstallmentPlan[]>(dummyInstallmentPlans)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<InstallmentPlan | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    months: "",
    interestRate: "",
  })

  const handleOpenModal = (plan?: InstallmentPlan) => {
    if (plan) {
      setEditingPlan(plan)
      setFormData({
        name: plan.name,
        months: plan.months.toString(),
        interestRate: plan.interestRate.toString(),
      })
    } else {
      setEditingPlan(null)
      setFormData({ name: "", months: "", interestRate: "" })
    }
    setIsModalOpen(true)
  }

  const handleSavePlan = () => {
    if (!formData.name || !formData.months || formData.interestRate === "") {
      alert("Please fill all fields")
      return
    }

    if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan.id
            ? {
                ...p,
                name: formData.name,
                months: Number.parseInt(formData.months),
                interestRate: Number.parseFloat(formData.interestRate),
              }
            : p,
        ),
      )
    } else {
      const newPlan: InstallmentPlan = {
        id: (Math.max(...plans.map((p) => Number.parseInt(p.id))) + 1).toString(),
        name: formData.name,
        months: Number.parseInt(formData.months),
        interestRate: Number.parseFloat(formData.interestRate),
      }
      setPlans([...plans, newPlan])
    }

    setIsModalOpen(false)
    setFormData({ name: "", months: "", interestRate: "" })
  }

  const handleDeletePlan = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Plan Button */}
      <div className="flex justify-end">
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-accent text-primary-foreground gap-2">
          <Plus size={20} />
          Add Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Duration</p>
                <p className="text-lg font-semibold text-foreground">{plan.months} Months</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Interest Rate</p>
                <p className="text-lg font-semibold text-foreground">{plan.interestRate}%</p>
              </div>
              <div className="flex gap-2 pt-4 flex-col sm:flex-row">
                <Button
                  onClick={() => handleOpenModal(plan)}
                  className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for Add/Edit Plan */}
      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? "Edit Plan" : "Add Plan"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Plan Name</label>
            <Input
              type="text"
              placeholder="e.g., 3 Month Plan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Months</label>
            <Input
              type="number"
              placeholder="e.g., 3, 6, 12"
              value={formData.months}
              onChange={(e) => setFormData({ ...formData, months: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Interest Rate (%)</label>
            <Input
              type="number"
              placeholder="e.g., 2.5"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="flex gap-2 pt-4 flex-col sm:flex-row">
            <Button onClick={handleSavePlan} className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
              {editingPlan ? "Update" : "Add"}
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

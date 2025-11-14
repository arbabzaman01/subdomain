"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { dummyProducts, dummyInstallmentPlans, dummyBrands } from "@/lib/dummy-data"
import { Plus, Edit2, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ModalDialog from "@/components/modal-dialog"

interface Product {
  id: string
  name: string
  price: number
  category: string
  brand: string
  images: string[]
  availableInstallmentPlanIds: string[]
  dateAdded: Date
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    images: [] as string[],
    availableInstallmentPlanIds: [] as string[],
  })
  const [imageInput, setImageInput] = useState("")

  // Filter products based on search
  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [products, searchTerm]
  )

  // Open modal for add/edit
  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        brand: product.brand,
        images: [...product.images],
        availableInstallmentPlanIds: [...product.availableInstallmentPlanIds],
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        price: "",
        category: "",
        brand: "",
        images: [],
        availableInstallmentPlanIds: [],
      })
    }
    setImageInput("")
    setIsModalOpen(true)
  }

  // Add image from URL input
  const handleAddImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput)) {
      setFormData({ ...formData, images: [...formData.images, imageInput] })
      setImageInput("")
    }
  }

  // Handle image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const imageData = reader.result as string
        if (!formData.images.includes(imageData)) {
          setFormData((prev) => ({ ...prev, images: [...prev.images, imageData] }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove image by index
  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  // Toggle installment plan selection
  const handleToggleInstallmentPlan = (planId: string) => {
    setFormData({
      ...formData,
      availableInstallmentPlanIds: formData.availableInstallmentPlanIds.includes(planId)
        ? formData.availableInstallmentPlanIds.filter((id) => id !== planId)
        : [...formData.availableInstallmentPlanIds, planId],
    })
  }

  // Save product (add or update)
  const handleSaveProduct = () => {
    if (!formData.name || !formData.price || !formData.category || !formData.brand || formData.images.length === 0) {
      alert("Please fill all fields and add at least one image")
      return
    }

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                price: Number.parseFloat(formData.price),
                category: formData.category,
                brand: formData.brand,
                images: formData.images,
                availableInstallmentPlanIds: formData.availableInstallmentPlanIds,
              }
            : p
        )
      )
    } else {
      const newProduct: Product = {
        id: (Math.max(...products.map((p) => Number.parseInt(p.id)), 0) + 1).toString(),
        name: formData.name,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        brand: formData.brand,
        images: formData.images,
        availableInstallmentPlanIds: formData.availableInstallmentPlanIds,
        dateAdded: new Date(),
      }
      setProducts([...products, newProduct])
    }

    setIsModalOpen(false)
    setFormData({
      name: "",
      price: "",
      category: "",
      brand: "",
      images: [],
      availableInstallmentPlanIds: [],
    })
  }

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  // Get installment plan names for product table
  const getProductInstallmentPlans = (planIds: string[]) => {
    return dummyInstallmentPlans
      .filter((plan) => planIds.includes(plan.id))
      .map((plan) => plan.name)
      .join(", ")
  }

  return (
    <div className="space-y-6">
      {/* Search & Add */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-accent text-primary-foreground gap-2">
          <Plus size={20} />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground">Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Brand</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Available Plans</th>
                  <th className="text-left py-3 px-4 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-sidebar">
                    <td className="py-3 px-4 text-foreground flex items-center gap-3">
                      <img
                        src={product.images[0] || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{product.brand}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      PKR {product.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {getProductInstallmentPlans(product.availableInstallmentPlanIds) || "No plans"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 hover:bg-sidebar rounded transition-colors"
                        >
                          <Edit2 size={16} className="text-accent" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 hover:bg-sidebar rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Product Name *</label>
            <Input
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Brand *</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground"
              >
                <option value="">Select Brand</option>
                {dummyBrands.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category *</label>
              <Input
                type="text"
                placeholder="e.g., Electronics"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Price (PKR) *</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="bg-input border-border"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Product Images *</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Paste image URL or upload below"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddImage()}
                  className="bg-input border-border flex-1"
                />
                <Button onClick={handleAddImage} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Add URL
                </Button>
              </div>
              <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-border rounded-lg hover:bg-sidebar cursor-pointer transition-colors">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-muted-foreground mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-12l-4-4m0 0l-4 4m4-4v16" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs text-muted-foreground">Click to upload or drag images</p>
                </div>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{formData.images.length} image(s) added</p>
                <div className="grid grid-cols-4 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img src={image || "/placeholder.svg"} alt={`Product ${index + 1}`} className="w-full h-20 rounded object-cover border border-border" />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} className="text-destructive-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Installment Plans */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Available Installment Plans *</label>
            <div className="bg-sidebar p-3 rounded-lg space-y-2">
              {dummyInstallmentPlans.map((plan) => (
                <label key={plan.id} className="flex items-start gap-3 cursor-pointer hover:opacity-80">
                  <input
                    type="checkbox"
                    checked={formData.availableInstallmentPlanIds.includes(plan.id)}
                    onChange={() => handleToggleInstallmentPlan(plan.id)}
                    className="mt-1 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">{plan.months} months • {plan.interestRate}% interest</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button onClick={handleSaveProduct} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              {editingProduct ? "Update Product" : "Add Product"}
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

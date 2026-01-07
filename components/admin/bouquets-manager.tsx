"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import BouquetsTable from "@/components/admin/BouquetsTable";

interface Bouquet {
  _id?: string
  name: string
  description: string
  price: number
  imageUrl: string
  chocolateType: string
  size: "Small" | "Medium" | "Large"
  occasion?: string
  isAvailable: boolean
}

export default function BouquetsManager() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Bouquet | null>(null)

  const [formData, setFormData] = useState<Bouquet>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    chocolateType: "",
    size: "Medium",
    occasion: "",
    isAvailable: true,
  })

  useEffect(() => {
    fetchBouquets()
  }, [])

  const fetchBouquets = async () => {
    try {
      const response = await fetch("/api/bouquets")
      const data = await response.json()
      setBouquets(Array.isArray(data) ? data : data.bouquets ?? [])
    } catch (error) {
      console.error("Failed to fetch bouquets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editing) {
        await fetch(`/api/bouquets/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/bouquets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      fetchBouquets()
      resetForm()
    } catch (error) {
      console.error("Failed to save bouquet:", error)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/bouquets/${id}`, { method: "DELETE" })
      fetchBouquets()
    } catch (error) {
      console.error("Failed to delete bouquet:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      chocolateType: "",
      size: "Medium",
      occasion: "",
      isAvailable: true,
    })
    setEditing(null)
  }

  const handleEdit = (bouquet: Bouquet) => {
    setEditing(bouquet)
    setFormData(bouquet)
  }

  return (
      <div className="space-y-6">
        {/* FORM */}
        <Card className="p-6 bg-white border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            {editing ? "Edit Bouquet" : "Add New Bouquet"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Bouquet Name
              </label>
              <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Price (₹)
              </label>
              <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Description
              </label>
              <textarea
                  value={formData.description}
                  onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg"
              />
            </div>

            {/* NEW: CHOCOLATE TYPE */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Chocolate Type
              </label>
              <Input
                  placeholder="e.g. Dark, Milk, White"
                  value={formData.chocolateType}
                  onChange={(e) =>
                      setFormData({ ...formData, chocolateType: e.target.value })
                  }
                  required
              />
            </div>

            {/* NEW: SIZE */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Size
              </label>
              <select
                  value={formData.size}
                  onChange={(e) =>
                      setFormData({
                        ...formData,
                        size: e.target.value as "Small" | "Medium" | "Large",
                      })
                  }
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg bg-white"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            {/* NEW: OCCASION */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Occasion (optional)
              </label>
              <Input
                  placeholder="e.g. Birthday, Anniversary"
                  value={formData.occasion}
                  onChange={(e) =>
                      setFormData({ ...formData, occasion: e.target.value })
                  }
              />
            </div>

            {/* NEW: AVAILABILITY */}
            <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                      setFormData({ ...formData, isAvailable: e.target.checked })
                  }
              />
              <label className="text-sm text-amber-900">
                Available for order
              </label>
            </div>

            {/* IMAGE */}
            <ImageUpload
                label="Bouquet Image"
                currentImage={formData.imageUrl}
                onUploadComplete={(url) =>
                    setFormData({ ...formData, imageUrl: url })
                }
            />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-amber-600">
                {editing ? "Update Bouquet" : "Add Bouquet"}
              </Button>

              {editing && (
                  <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="border-amber-300"
                  >
                    Cancel
                  </Button>
              )}
            </div>
          </form>
        </Card>

        {/* GALLERY */}
        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Bouquets Gallery
          </h2>

          <BouquetsTable
              bouquets={bouquets}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
          />

        </div>
      </div>
  )
}

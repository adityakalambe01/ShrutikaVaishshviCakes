"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"

interface Bouquet {
  id?: string
  name: string
  description: string
  price: number
  image: string
}

export default function BouquetsManager() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Bouquet | null>(null)
  const [formData, setFormData] = useState<Bouquet>({
    name: "",
    description: "",
    price: 0,
    image: "",
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
        await fetch(`/api/bouquets/${editing.id}`, {
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
    setFormData({ name: "", description: "", price: 0, image: "" })
    setEditing(null)
  }

  const handleEdit = (bouquet: Bouquet) => {
    setEditing(bouquet)
    setFormData(bouquet)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">{editing ? "Edit Bouquet" : "Add New Bouquet"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Bouquet Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Romance Chocolate Bouquet"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Price (₹)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the bouquet..."
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <ImageUpload
            onUploadComplete={(url) => setFormData({ ...formData, image: url })}
            currentImage={formData.image}
            label="Bouquet Image"
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
              {editing ? "Update Bouquet" : "Add Bouquet"}
            </Button>
            {editing && (
              <Button type="button" onClick={resetForm} variant="outline" className="border-amber-300 bg-transparent">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Bouquets Gallery</h2>
        {loading ? (
          <p className="text-amber-700">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bouquets.map((bouquet) => (
              <Card key={bouquet.id} className="overflow-hidden border-amber-200">
                <div className="aspect-square bg-amber-50 relative">
                  {bouquet.image && (
                    <img
                      src={bouquet.image || "/placeholder.svg"}
                      alt={bouquet.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-900">{bouquet.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{bouquet.description.substring(0, 50)}...</p>
                  <p className="font-bold text-amber-600 mb-3">₹{bouquet.price}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(bouquet)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-amber-300"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(bouquet.id)} size="sm" variant="destructive" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"

interface Cake {
  id?: string
  name: string
  flavor: string
  description: string
  price: number
  image: string
  category: string
}

const CAKE_CATEGORIES = [
  "chocolate",
  "vanilla",
  "strawberry",
  "red-velvet",
  "carrot",
  "coffee",
  "lemon",
  "pistachio",
  "custom",
]

export default function CakesManager() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Cake | null>(null)
  const [formData, setFormData] = useState<Cake>({
    name: "",
    flavor: "",
    description: "",
    price: 0,
    image: "",
    category: "chocolate",
  })

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      const response = await fetch("/api/cakes")
      const data = await response.json()
      setCakes(Array.isArray(data) ? data : data.cakes ?? [])
    } catch (error) {
      console.error("Failed to fetch cakes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editing) {
        await fetch(`/api/cakes/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/cakes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      fetchCakes()
      resetForm()
    } catch (error) {
      console.error("Failed to save cake:", error)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/cakes/${id}`, { method: "DELETE" })
      fetchCakes()
    } catch (error) {
      console.error("Failed to delete cake:", error)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", flavor: "", description: "", price: 0, image: "", category: "chocolate" })
    setEditing(null)
  }

  const handleEdit = (cake: Cake) => {
    setEditing(cake)
    setFormData(cake)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">{editing ? "Edit Cake" : "Add New Cake"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Cake Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Triple Chocolate Delight"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CAKE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Flavor</label>
              <Input
                value={formData.flavor}
                onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                placeholder="e.g., Rich Dark Chocolate"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the cake..."
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <ImageUpload
            onUploadComplete={(url) => setFormData({ ...formData, image: url })}
            currentImage={formData.image}
            label="Cake Image"
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
              {editing ? "Update Cake" : "Add Cake"}
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
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Cakes Gallery</h2>
        {loading ? (
          <p className="text-amber-700">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cakes.map((cake) => (
              <Card key={cake.id} className="overflow-hidden border-amber-200">
                <div className="aspect-square bg-amber-50 relative">
                  {cake.image && (
                    <img
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-900">{cake.name}</h3>
                  <p className="text-sm text-amber-700 mb-2">{cake.flavor}</p>
                  <p className="text-sm text-gray-600 mb-2">{cake.description.substring(0, 50)}...</p>
                  <p className="font-bold text-amber-600 mb-3">₹{cake.price}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(cake)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-amber-300"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(cake.id)} size="sm" variant="destructive" className="flex-1">
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

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"

interface Cake {
  _id?: string
  name: string
  flavor: string
  description: string
  price: number
  servings: number
  imageUrl: string
  category: "Premium" | "Custom" | "Classic"
  isAvailable: boolean
  tags: string[]
}

interface CakeForm {
  name: string
  flavor: string
  description: string
  price: string
  servings: string
  imageUrl: string
  category: "Premium" | "Custom" | "Classic"
  tags: string
}

const CAKE_CATEGORIES: Cake["category"][] = ["Classic", "Premium", "Custom"]

export default function CakesManager() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Cake | null>(null)

  const [formData, setFormData] = useState<CakeForm>({
    name: "",
    flavor: "",
    description: "",
    price: "",
    servings: "",
    imageUrl: "",
    category: "Classic",
    tags: "",
  })

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      const res = await fetch("/api/cakes")
      const data = await res.json()
      setCakes(Array.isArray(data) ? data : data.cakes ?? [])
    } catch (err) {
      console.error("Failed to fetch cakes:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      price: Number(formData.price),
      servings: Number(formData.servings),
      tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      isAvailable: true,
    }

    try {
      if (editing?._id) {
        await fetch(`/api/cakes/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/cakes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      await fetchCakes()
      resetForm()
    } catch (err) {
      console.error("Failed to save cake:", err)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/cakes/${id}`, { method: "DELETE" })
      fetchCakes()
    } catch (err) {
      console.error("Failed to delete cake:", err)
    }
  }

  const handleEdit = (cake: Cake) => {
    setEditing(cake)
    setFormData({
      name: cake.name,
      flavor: cake.flavor,
      description: cake.description,
      price: cake.price.toString(),
      servings: cake.servings.toString(),
      imageUrl: cake.imageUrl,
      category: cake.category,
      tags: cake.tags.join(", "),
    })
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      name: "",
      flavor: "",
      description: "",
      price: "",
      servings: "",
      imageUrl: "",
      category: "Classic",
      tags: "",
    })
  }

  return (
      <div className="space-y-6">
        {/* FORM */}
        <Card className="p-6 bg-white border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            {editing ? "Edit Cake" : "Add New Cake"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Cake Name
                </label>
                <Input
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Category
                </label>
                <select
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Cake["category"],
                        })
                    }
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  {CAKE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Flavor
                </label>
                <Input
                    value={formData.flavor}
                    onChange={(e) =>
                        setFormData({ ...formData, flavor: e.target.value })
                    }
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
                        setFormData({ ...formData, price: e.target.value })
                    }
                    required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Servings
                </label>
                <Input
                    type="number"
                    value={formData.servings}
                    onChange={(e) =>
                        setFormData({ ...formData, servings: e.target.value })
                    }
                    required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Description
              </label>
              <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Tags (comma separated)
              </label>
              <Input
                  value={formData.tags}
                  onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                  }
              />
            </div>

            <ImageUpload
                label="Cake Image"
                currentImage={formData.imageUrl}
                onUploadComplete={(url) =>
                    setFormData({ ...formData, imageUrl: url })
                }
            />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                {editing ? "Update Cake" : "Add Cake"}
              </Button>

              {editing && (
                  <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
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
            Cakes Gallery
          </h2>

          {loading ? (
              <p className="text-amber-700">Loading...</p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cakes.map((cake) => (
                    <Card key={cake._id} className="overflow-hidden border-amber-200">
                      <div className="aspect-square bg-amber-50">
                        <img
                            src={cake.imageUrl || "/placeholder.svg"}
                            alt={cake.name}
                            className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-amber-900">{cake.name}</h3>
                        <p className="text-sm text-amber-700">{cake.flavor}</p>
                        <p className="text-sm text-gray-600 my-2">
                          {cake.description.slice(0, 50)}...
                        </p>
                        <p className="font-bold text-amber-600 mb-3">
                          ₹{cake.price}
                        </p>

                        <div className="flex gap-2">
                          <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleEdit(cake)}
                          >
                            Edit
                          </Button>
                          <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleDelete(cake._id)}
                          >
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

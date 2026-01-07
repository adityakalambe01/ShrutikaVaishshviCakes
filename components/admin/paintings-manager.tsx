"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"

interface Painting {
  id?: string
  title: string
  description: string
  price: number
  imageUrl: string
  artist: string
  medium: string
  dimensions: string
}

export default function PaintingsManager() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Painting | null>(null)

  const [formData, setFormData] = useState<Painting>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    artist: "Shrutika",
    medium: "",
    dimensions: "",
  })

  useEffect(() => {
    fetchPaintings()
  }, [])

  const fetchPaintings = async () => {
    try {
      const response = await fetch("/api/paintings")
      const data = await response.json()
      setPaintings(Array.isArray(data) ? data : data.paintings ?? [])
    } catch (error) {
      console.error("Failed to fetch paintings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      alert("Please upload an image before submitting")
      return
    }

    try {
      if (editing) {
        await fetch(`/api/paintings/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/paintings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      await fetchPaintings()
      resetForm()
    } catch (error) {
      console.error("Failed to save painting:", error)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/paintings/${id}`, { method: "DELETE" })
      fetchPaintings()
    } catch (error) {
      console.error("Failed to delete painting:", error)
    }
  }

  const handleEdit = (painting: Painting) => {
    setEditing(painting)
    setFormData(painting)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      artist: "Shrutika",
      medium: "",
      dimensions: "",
    })
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      {/* FORM */}
      <Card className="p-6 bg-white border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          {editing ? "Edit Painting" : "Add New Painting"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Painting Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
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
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* NEW FIELDS */}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Medium
            </label>
            <Input
              placeholder="e.g. Oil on Canvas"
              value={formData.medium}
              onChange={(e) =>
                setFormData({ ...formData, medium: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Dimensions
            </label>
            <Input
              placeholder="e.g. 24 x 36 inches"
              value={formData.dimensions}
              onChange={(e) =>
                setFormData({ ...formData, dimensions: e.target.value })
              }
              required
            />
          </div>

          {/* IMAGE */}
          <ImageUpload
            label="Painting Image"
            currentImage={formData.imageUrl}
            onUploadComplete={(url) =>
              setFormData({ ...formData, imageUrl: url })
            }
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
              {editing ? "Update Painting" : "Add Painting"}
            </Button>

            {editing && (
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="border-amber-300 bg-transparent"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* GALLERY — RESTORED EXACT OLD LOOK */}
      <div>
  <h2 className="text-2xl font-bold text-amber-900 mb-4">
    Paintings Gallery
  </h2>

  {loading ? (
    <p className="text-amber-700">Loading...</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {paintings.map((painting) => (
    <Card key={painting.id} className="overflow-hidden border-amber-200 flex flex-col">
  {/* Square image container */}
  <div className="w-full aspect-square bg-amber-50">
    {painting.imageUrl ? (
      <img
        src={painting.imageUrl}
        alt={painting.title}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gray-100" />
    )}
  </div>

  {/* Card content */}
  <div className="p-4 flex flex-col flex-1">
    <h3 className="font-bold text-amber-900">{painting.title}</h3>
    <p className="text-sm text-amber-700">by {painting.artist}</p>
    <p className="text-sm text-gray-600">{painting.medium}</p>
    <p className="text-sm text-gray-600">{painting.dimensions}</p>
    <p className="text-sm text-gray-600 mt-2">
      {painting.description.slice(0, 50)}...
    </p>
    <p className="font-bold text-amber-600 mb-3">₹{painting.price}</p>

    <div className="flex gap-2 mt-auto">
      <Button onClick={() => handleEdit(painting)} variant="outline" size="sm" className="flex-1 border-amber-300">
        Edit
      </Button>
      <Button onClick={() => handleDelete(painting.id)} size="sm" variant="destructive" className="flex-1">
        Delete
      </Button>
    </div>
  </div>
</Card>
2222222222
  ))}
</div>

  )}
</div>

    </div>
  )
}

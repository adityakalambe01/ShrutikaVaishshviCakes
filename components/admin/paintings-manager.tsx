"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import PaintingsTable from "@/components/admin/PaintingsTable"

const PAINTING_MEDIUMS = [
  "Oil on Canvas",
  "Acrylic on Canvas",
  "Watercolor on Paper",
  "Charcoal on Paper",
  "Ink on Paper",
  "Mixed Media",
  "Digital Art",
]

interface Painting {
  _id?: string
  title: string
  description: string
  price: number
  imageUrl: string
  artist: string
  medium: string
  dimensions: string
}

interface PaintingForm {
  title: string
  description: string
  price: string // 👈 IMPORTANT: string while typing
  imageUrl: string
  artist: string
  medium: string
  dimensions: string
}

export default function PaintingsManager() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Painting | null>(null)

  const [formData, setFormData] = useState<PaintingForm>({
    title: "",
    description: "",
    price: "",
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
      const res = await fetch("/api/paintings")
      const data = await res.json()
      setPaintings(Array.isArray(data) ? data : data.paintings ?? [])
    } catch (err) {
      console.error("Failed to fetch paintings:", err)
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

    const payload = {
      ...formData,
      price: Number(formData.price), // ✅ convert ONLY here
    }

    try {
      if (editing?._id) {
        await fetch(`/api/paintings/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch("/api/paintings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      await fetchPaintings()
      resetForm()
    } catch (err) {
      console.error("Failed to save painting:", err)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/paintings/${id}`, { method: "DELETE" })
      fetchPaintings()
    } catch (err) {
      console.error("Failed to delete painting:", err)
    }
  }

  const handleEdit = (painting: Painting) => {
    setEditing(painting)
    setFormData({
      title: painting.title,
      description: painting.description,
      price: painting.price.toString(),
      imageUrl: painting.imageUrl,
      artist: painting.artist,
      medium: painting.medium,
      dimensions: painting.dimensions,
    })
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      artist: "Shrutika",
      medium: "",
      dimensions: "",
    })
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
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                  }
                  required
              />
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
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Medium
              </label>
              <select
                  value={formData.medium}
                  onChange={(e) =>
                      setFormData({ ...formData, medium: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-amber-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>
                  Select Medium
                </option>
                {PAINTING_MEDIUMS.map((medium) => (
                    <option key={medium} value={medium}>
                      {medium}
                    </option>
                ))}
              </select>
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
                      variant="outline"
                      onClick={resetForm}
                      className="border-amber-300 bg-transparent"
                  >
                    Cancel
                  </Button>
              )}
            </div>
          </form>
        </Card>

        {/* TABLE */}
        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Paintings Gallery
          </h2>

          {loading ? (
              <p className="text-amber-700">Loading...</p>
          ) : (
              <PaintingsTable
                  paintings={paintings}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
              />
          )}
        </div>
      </div>
  )
}

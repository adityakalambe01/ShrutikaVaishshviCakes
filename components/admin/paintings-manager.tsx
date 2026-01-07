"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import PaintingsTable from "@/components/admin/PaintingsTable";

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
            <select
                value={formData.medium}
                onChange={(e) =>
                    setFormData({ ...formData, medium: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-amber-200 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-amber-500
               bg-white text-sm"
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

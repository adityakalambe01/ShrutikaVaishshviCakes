"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import PaintingsTable from "@/components/admin/PaintingsTable"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {toastError, toastSuccess} from "@/lib/toast.service";

/* ---------- CONSTANTS ---------- */
const PAINTING_MEDIUMS = [
  "Oil on Canvas",
  "Acrylic on Canvas",
  "Watercolor on Paper",
  "Charcoal on Paper",
  "Ink on Paper",
  "Mixed Media",
  "Digital Art",
]

/* ---------- TYPES ---------- */
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
  price: string
  imageUrl: string
  artist: string
  medium: string
  dimensions: string
}

export default function PaintingsManager() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Painting | null>(null)
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<PaintingForm>({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    artist: "Shrutika",
    medium: "",
    dimensions: "",
  })

  /* ---------- FETCH ---------- */
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
      toastError("Failed to fetch paintings. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  /* ---------- ACTIONS ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      alert("Please upload an image")
      toastError("Please upload an image.")
      return
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
    }

    try {
      if (editing?._id) {
        await fetch(`/api/paintings/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        toastSuccess("Painting updated successfully.")
      } else {
        await fetch("/api/paintings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        toastSuccess("Painting added successfully.")
      }

      await fetchPaintings()
      resetForm()
      setOpen(false)
    } catch (err) {
      console.error("Failed to save painting:", err)
      toastError("Failed to save/update painting. Please try again later.")
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/paintings/${id}`, { method: "DELETE" })
      toastSuccess("Painting deleted successfully.")
    }catch (err) {
      console.error("Failed to delete painting:", err)
      toastError("Failed to delete painting. Please try again later.")
    }
    fetchPaintings()
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
    setOpen(true)
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
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-900">Paintings</h2>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                  className="bg-amber-600"
                  onClick={() => {
                    resetForm()
                    setOpen(true)
                  }}
              >
                Add Painting
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Painting" : "Add New Painting"}
                </DialogTitle>
              </DialogHeader>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* BASIC INFO */}
                <Card className="p-4 border-amber-200 bg-white">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
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

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
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

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Medium
                      </label>
                      <select
                          value={formData.medium}
                          onChange={(e) =>
                              setFormData({ ...formData, medium: e.target.value })
                          }
                          className="h-10 w-full rounded-lg border border-amber-200 bg-white px-3 text-sm focus:ring-2 focus:ring-amber-500"
                          required
                      >
                        <option value="" disabled>
                          Select Medium
                        </option>
                        {PAINTING_MEDIUMS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Dimensions
                      </label>
                      <Input
                          placeholder="24 x 36 inches"
                          value={formData.dimensions}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                dimensions: e.target.value,
                              })
                          }
                          required
                      />
                    </div>
                  </div>
                </Card>

                {/* DESCRIPTION */}
                <Card className="p-4 border-amber-200 bg-white">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-amber-900">
                      Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500"
                        required
                    />
                  </div>
                </Card>

                {/* IMAGE */}
                <Card className="p-4 border-amber-200 bg-white">
                  <label className="text-xs font-medium text-amber-900 block mb-2">
                    Painting Image
                  </label>
                  <ImageUpload
                      currentImage={formData.imageUrl}
                      onUploadComplete={(url) =>
                          setFormData({ ...formData, imageUrl: url })
                      }
                  />
                </Card>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-2">
                  <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600"
                  >
                    {editing ? "Update Painting" : "Add Painting"}
                  </Button>

                  <DialogClose asChild>
                    <Button variant="outline" className="border-amber-300">
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* TABLE */}
        <PaintingsTable
            paintings={paintings}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>
  )
}

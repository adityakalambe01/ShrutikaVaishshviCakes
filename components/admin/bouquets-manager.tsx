"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import BouquetsTable from "@/components/admin/BouquetsTable"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {toastError, toastSuccess} from "@/lib/toast.service";

/* ---------- TYPES ---------- */
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
  const [open, setOpen] = useState(false)

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

  /* ---------- FETCH ---------- */
  useEffect(() => {
    fetchBouquets()
  }, [])

  const fetchBouquets = async () => {
    try {
      const res = await fetch("/api/bouquets")
      const data = await res.json()
      setBouquets(Array.isArray(data) ? data : data.bouquets ?? [])
    } catch (err) {
      console.error("Failed to fetch bouquets:", err)
      toastError("Failed to fetch bouquets. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  /* ---------- ACTIONS ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editing?._id) {
        await fetch(`/api/bouquets/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        toastSuccess("Bouquet updated successfully.")
      } else {
        await fetch("/api/bouquets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        toastSuccess("Bouquet added successfully.")
      }

      await fetchBouquets()
      resetForm()
      setOpen(false)
    } catch (err) {
      console.error("Failed to save bouquet:", err)
      toastError("Failed to save/update bouquet. Please try again later.")
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    try {
      await fetch(`/api/bouquets/${id}`, { method: "DELETE" })
      toastSuccess("Bouquet deleted successfully.")
    }catch (err) {
      console.error("Failed to delete bouquet:", err)
      toastError("Failed to delete bouquet. Please try again later.")
    }
    fetchBouquets()
  }

  const handleEdit = (bouquet: Bouquet) => {
    setEditing(bouquet)
    setFormData(bouquet)
    setOpen(true)
  }

  const resetForm = () => {
    setEditing(null)
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
  }

  return (
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-900">Bouquets</h2>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                  className="bg-amber-600"
                  onClick={() => {
                    resetForm()
                    setOpen(true)
                  }}
              >
                Add Bouquet
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Bouquet" : "Add New Bouquet"}
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
                        Bouquet Name
                      </label>
                      <Input
                          value={formData.name}
                          onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                          }
                          required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Price (₹)
                      </label>
                      <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: Number(e.target.value),
                              })
                          }
                          required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Chocolate Type
                      </label>
                      <Input
                          placeholder="Dark, Milk, White"
                          value={formData.chocolateType}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                chocolateType: e.target.value,
                              })
                          }
                          required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Size
                      </label>
                      <select
                          value={formData.size}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                size: e.target.value as Bouquet["size"],
                              })
                          }
                          className="h-10 w-full rounded-lg border border-amber-200 bg-white px-3 text-sm focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
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

                  <div className="mt-3 space-y-1">
                    <label className="text-xs font-medium text-amber-900">
                      Occasion (optional)
                    </label>
                    <Input
                        placeholder="Birthday, Anniversary"
                        value={formData.occasion}
                        onChange={(e) =>
                            setFormData({ ...formData, occasion: e.target.value })
                        }
                    />
                  </div>
                </Card>

                {/* IMAGE */}
                <Card className="p-4 border-amber-200 bg-white">
                  <label className="text-xs font-medium text-amber-900 block mb-2">
                    Bouquet Image
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
                    {editing ? "Update Bouquet" : "Add Bouquet"}
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
        <BouquetsTable
            bouquets={bouquets}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>
  )
}

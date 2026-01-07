"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import CakesTable from "@/components/admin/CakesTable"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  const [open, setOpen] = useState(false)

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
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
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
      setOpen(false)
    } catch (err) {
      console.error("Failed to save cake:", err)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    await fetch(`/api/cakes/${id}`, { method: "DELETE" })
    fetchCakes()
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
    setOpen(true)
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
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-900">Cakes</h2>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                  onClick={() => {
                    resetForm()
                    setOpen(true)
                  }}
                  className="bg-amber-600 hover:bg-amber-700"
              >
                Add New Cake
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader className="pb-2 border-b">
                <DialogTitle className="text-xl">
                  {editing ? "Edit Cake" : "Add New Cake"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                {/* SECTION: BASIC */}
                <Card className="p-4 border-amber-200 bg-white">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Cake Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Cake Name
                      </label>
                      <Input
                          placeholder="e.g. Chocolate Truffle"
                          value={formData.name}
                          onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                          }
                          required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
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
                          className="h-10 w-full rounded-lg border border-amber-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {CAKE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                        ))}
                      </select>
                    </div>

                    {/* Flavor */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Flavor
                      </label>
                      <Input
                          placeholder="e.g. Dark Chocolate"
                          value={formData.flavor}
                          onChange={(e) =>
                              setFormData({ ...formData, flavor: e.target.value })
                          }
                          required
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Price (₹)
                      </label>
                      <Input
                          type="number"
                          placeholder="e.g. 1200"
                          value={formData.price}
                          onChange={(e) =>
                              setFormData({ ...formData, price: e.target.value })
                          }
                          required
                      />
                    </div>

                    {/* Servings */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-amber-900">
                        Servings
                      </label>
                      <Input
                          type="number"
                          placeholder="e.g. 10"
                          value={formData.servings}
                          onChange={(e) =>
                              setFormData({ ...formData, servings: e.target.value })
                          }
                          required
                      />
                    </div>
                  </div>
                </Card>


                {/* SECTION: DETAILS */}
                <Card className="p-4 border-amber-200 bg-white">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">
                    Description & Tags
                  </h3>

                  <div className="space-y-4">
                  <textarea
                      rows={4}
                      placeholder="Describe the cake..."
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

                    <Input
                        placeholder="Tags (comma separated)"
                        value={formData.tags}
                        onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                        }
                    />
                  </div>
                </Card>

                {/* SECTION: IMAGE */}
                <Card className="p-4 border-amber-200 bg-white">
                  <h3 className="text-sm font-semibold text-amber-900 mb-3">
                    Cake Image
                  </h3>

                  <ImageUpload
                      currentImage={formData.imageUrl}
                      onUploadComplete={(url) =>
                          setFormData({ ...formData, imageUrl: url })
                      }
                  />
                </Card>

                {/* ACTIONS */}
                <div className="bottom-0 pt-4 border-t border-amber-200 flex gap-3">
                  <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600"
                  >
                    {editing ? "Update Cake" : "Add Cake"}
                  </Button>

                  <DialogClose asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-amber-300"
                        onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* TABLE */}
        <CakesTable
            cakes={cakes}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      </div>
  )
}

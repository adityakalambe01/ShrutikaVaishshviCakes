"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

interface Cake {
  _id: string
  name: string
  flavor: string
  price: number
  description: string
  imageUrl: string
  category: "Classic" | "Premium" | "Custom"
}

export default function CakesGalleryPage() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"all" | Cake["category"]>("all")

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

  const categories: { value: "all" | Cake["category"]; label: string }[] = [
    { value: "all", label: "All Cakes" },
    { value: "Classic", label: "Classic" },
    { value: "Premium", label: "Premium" },
    { value: "Custom", label: "Custom" },
  ]

  const filtered =
      activeFilter === "all"
          ? cakes
          : cakes.filter((cake) => cake.category === activeFilter)

  return (
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Our Cakes Collection
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Explore our wide variety of handcrafted cakes, from timeless classics
              to premium and custom creations
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white border-b border-amber-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 justify-start md:justify-center flex-wrap md:flex-nowrap">
              {categories.map((filter) => (
                  <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                          activeFilter === filter.value
                              ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                              : "border-2 border-amber-200 text-foreground hover:border-amber-400"
                      }`}
                  >
                    {filter.label}
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cakes Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="text-center py-12">
                  <p className="text-amber-700 text-lg">Loading cakes...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-amber-700 text-lg">
                    No cakes found in this category.
                  </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {filtered.map((cake) => (
                      <Card
                          key={cake._id}
                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-amber-200 transition-all hover:border-amber-400 hover:shadow-xl"
                      >
                        {/* IMAGE */}
                        <div className="relative h-64 w-full overflow-hidden bg-muted">
                          <img
                              src={cake.imageUrl || "/placeholder.svg"}
                              alt={cake.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* CONTENT */}
                        <CardContent className="flex flex-1 flex-col p-6">
                          <p className="mb-2 text-sm font-semibold uppercase text-amber-600">
                            {cake.category}
                          </p>

                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {cake.name}
                          </h3>

                          <p className="text-sm text-foreground/60 mb-3">
                            {cake.flavor}
                          </p>

                          <p className="text-sm text-foreground/60 line-clamp-3">
                            {cake.description}
                          </p>
                        </CardContent>

                        {/* FOOTER (ALWAYS AT BOTTOM) */}
                        <CardFooter className="mt-auto flex items-center justify-between border-t border-amber-100 bg-white px-6 py-4">
                          <span className="text-lg font-bold text-amber-600">
                            ₹{cake.price}
                          </span>

                          <Button
                              size="sm"
                              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:opacity-90"
                          >
                            Order Now
                          </Button>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
  )
}

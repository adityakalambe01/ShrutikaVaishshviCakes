"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Cake {
  id: string
  name: string
  flavor: string
  price: number
  description: string
  image: string
  category: string
}

export default function CakesGalleryPage() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      const response = await fetch("/api/cakes")
      const data = await response.json()
      setCakes(Array.isArray(data) ? data : data.cakes  ?? [])
    } catch (error) {
      console.error("Failed to fetch cakes:", error)
    } finally {
      setLoading(false)
    }
  }

  const flavors = [
    { value: "all", label: "All Cakes" },
    { value: "chocolate", label: "Chocolate" },
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
    { value: "red-velvet", label: "Red Velvet" },
    { value: "carrot", label: "Carrot" },
    { value: "coffee", label: "Coffee" },
    { value: "lemon", label: "Lemon" },
    { value: "pistachio", label: "Pistachio" },
  ]

  const filtered = activeFilter === "all" ? cakes : cakes.filter((c) => c.category === activeFilter)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Our Cakes Collection</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore our wide variety of handcrafted cakes in delicious flavors, from classic chocolate to exotic
            pistachio
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-amber-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 justify-start md:justify-center flex-wrap md:flex-nowrap">
            {flavors.map((filter) => (
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
              <p className="text-amber-700 text-lg">No cakes found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map((cake) => (
                <div
                  key={cake.id}
                  className="group overflow-hidden rounded-xl border border-amber-200 hover:border-amber-400 transition-all hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-sm text-amber-600 font-semibold mb-2 uppercase">{cake.category}</p>
                    <h3 className="text-xl font-bold text-foreground mb-2">{cake.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4">{cake.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-600">₹{cake.price}</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

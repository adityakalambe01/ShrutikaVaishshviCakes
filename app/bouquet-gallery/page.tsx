"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

interface Bouquet {
  id: string
  name: string
  price: number
  description: string
  image: string
}

export default function BouquetGalleryPage() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBouquets()
  }, [])

  const fetchBouquets = async () => {
    try {
      const response = await fetch("/api/bouquets")
      const data = await response.json()
      setBouquets(Array.isArray(data) ? data : data.bouquets ?? [])
    } catch (error) {
      console.error("Failed to fetch bouquets:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Chocolate Bouquets</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Exquisite handcrafted chocolate bouquets for gifts, special occasions, and celebrations
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Premium Chocolates", desc: "Made with the finest imported chocolate" },
              { title: "Artistic Design", desc: "Hand-arranged with creative flair" },
              { title: "Perfect Gift", desc: "Beautiful presentation for any occasion" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-amber-200 bg-amber-50/50">
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouquets Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-amber-700 text-lg">Loading bouquets...</p>
            </div>
          ) : bouquets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-700 text-lg">No bouquets available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {bouquets.map((bouquet) => (
                <div
                  key={bouquet.id}
                  className="group overflow-hidden rounded-xl border border-amber-200 hover:border-amber-400 transition-all hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={bouquet.image || "/placeholder.svg"}
                      alt={bouquet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-foreground mb-2">{bouquet.name}</h3>
                    <p className="text-foreground/60 text-sm mb-4">{bouquet.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-600">₹{bouquet.price}</span>
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

      {/* Why Bouquets Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Perfect For Every Occasion</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Anniversaries", items: ["Express your love", "Romantic presentation", "Premium quality"] },
              { title: "Birthdays", items: ["Unique gift idea", "Instagram-worthy", "Memorable experience"] },
              { title: "Gifts", items: ["Corporate gifts", "Personal tokens", "Creative packaging"] },
              { title: "Celebrations", items: ["Graduations", "Promotions", "Special milestones"] },
            ].map((occasion, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-amber-200">
                <h3 className="text-2xl font-bold text-foreground mb-4">{occasion.title}</h3>
                <ul className="space-y-2">
                  {occasion.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-foreground/70">
                      <span className="text-amber-600 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

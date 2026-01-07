"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function CakesPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const cakes = [
    {
      id: 1,
      name: "Classic Chocolate Elegance",
      category: "premium",
      price: "$45",
      description: "Rich multi-layer chocolate cake with ganache frosting",
      image: "/elegant-chocolate-cake-with-frosting.jpg",
    },
    {
      id: 2,
      name: "Artistic Tier Cake",
      category: "custom",
      price: "Custom",
      description: "Three-tier cake with hand-painted chocolate designs",
      image: "/artistic-three-tier-chocolate-cake.jpg",
    },
    {
      id: 3,
      name: "Decadent Dark Chocolate",
      category: "premium",
      price: "$55",
      description: "Sinfully rich dark chocolate with raspberry filling",
      image: "/dark-chocolate-cake-with-berries.jpg",
    },
    {
      id: 4,
      name: "Custom Designed Cake",
      category: "custom",
      price: "Custom",
      description: "Fully customized to your specifications and theme",
      image: "/custom-designed-artistic-chocolate-cake.jpg",
    },
    {
      id: 5,
      name: "Milk Chocolate Delight",
      category: "premium",
      price: "$40",
      description: "Smooth milk chocolate with creamy filling",
      image: "/milk-chocolate-cake-smooth-finish.jpg",
    },
    {
      id: 6,
      name: "Signature Masterpiece",
      category: "premium",
      price: "$65",
      description: "Our signature creation with intricate chocolate work",
      image: "/signature-chocolate-masterpiece-cake-detailed.jpg",
    },
  ]

  const filtered = activeFilter === "all" ? cakes : cakes.filter((c) => c.category === activeFilter)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Our Cake Collection</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover our exquisite selection of handcrafted chocolate cakes, each one a unique work of art
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { value: "all", label: "All Cakes" },
              { value: "premium", label: "Premium Collection" },
              { value: "custom", label: "Custom Orders" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
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
                  <p className="text-sm text-amber-600 font-semibold mb-2">
                    {cake.category === "custom" ? "CUSTOM ORDER" : "PREMIUM"}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-2">{cake.name}</h3>
                  <p className="text-foreground/60 text-sm mb-4">{cake.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">{cake.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all text-sm">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Cakes Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Our Cakes Special</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Premium Ingredients",
                points: [
                  "Imported Belgian chocolate",
                  "Fresh cream and butter",
                  "Natural flavors",
                  "No artificial colors",
                ],
              },
              {
                title: "Artistic Excellence",
                points: [
                  "Hand-designed decorations",
                  "Precision craftsmanship",
                  "Custom themes available",
                  "Attention to detail",
                ],
              },
              {
                title: "Perfect For",
                points: ["Birthdays & celebrations", "Weddings & engagements", "Corporate events", "Special occasions"],
              },
              {
                title: "Our Promise",
                points: [
                  "Fresh baked daily",
                  "Hygienic preparation",
                  "On-time delivery",
                  "Customer satisfaction guaranteed",
                ],
              },
            ].map((section, i) => (
              <div key={i} className="p-8 bg-white rounded-xl border border-amber-200">
                <h3 className="text-2xl font-bold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold mt-1">✓</span>
                      <span className="text-foreground/70">{point}</span>
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

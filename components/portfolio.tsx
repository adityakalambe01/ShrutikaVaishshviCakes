"use client"

import { useState } from "react"

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all")

  const portfolioItems = [
    {
      id: 1,
      category: "paintings",
      artist: "Shrutika",
      title: "Portrait - Azure Dreams",
      image: "/beautiful-portrait-painting-in-oils.jpg",
    },
    {
      id: 2,
      category: "cakes",
      artist: "Shrutika & Vaishnavi",
      title: "Chocolate Masterpiece Cake",
      image: "/elegant-chocolate-cake-with-artistic-decoration.jpg",
    },
    {
      id: 3,
      category: "bouquets",
      artist: "Shrutika & Vaishnavi",
      title: "Luxury Chocolate Bouquet",
      image: "/creative-chocolate-bouquet-arrangement.jpg",
    },
    {
      id: 4,
      category: "paintings",
      artist: "Shrutika",
      title: "Portrait - Golden Hour",
      image: "/portrait-painting-warm-colors-sunset.jpg",
    },
    {
      id: 5,
      category: "cakes",
      artist: "Shrutika & Vaishnavi",
      title: "Artistic Tier Cake",
      image: "/multi-tier-chocolate-cake-artistic-design.jpg",
    },
    {
      id: 6,
      category: "bouquets",
      artist: "Shrutika & Vaishnavi",
      title: "Premium Gift Bouquet",
      image: "/premium-chocolate-bouquet-luxury-packaging.jpg",
    },
  ]

  const filtered =
    activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Gallery</h2>
          <p className="text-foreground/60 text-lg">A curated collection of our finest works</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {["all", "paintings", "cakes", "bouquets"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "border border-border text-foreground/70 hover:border-accent"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border hover:border-accent transition-all"
            >
              <div className="relative h-80 overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm text-accent mb-1">{item.artist}</p>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

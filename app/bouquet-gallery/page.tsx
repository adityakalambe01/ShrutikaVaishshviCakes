"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {BouquetCardSkeleton} from "@/app/bouquet-gallery/BouquetCardSkeleton";

interface Bouquet {
  _id: string
  name: string
  price: number
  description: string
  imageUrl: string
  chocolateType: string
  size: string
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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Chocolate Bouquets
            </h1>
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
                <div className={'grid md:grid-cols-3 gap-8'}>
                  {Array.from({length: 3}).map((_, i) => (
                      <BouquetCardSkeleton key={i}/>
                  ))}
                </div>
            ) : bouquets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-amber-700 text-lg">No bouquets available yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {bouquets.map((bouquet) => (
                      <Card
                          key={bouquet._id}
                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-amber-200 transition-all hover:border-amber-400 hover:shadow-xl"
                      >
                        {/* IMAGE */}
                        <div className="relative h-64 w-full overflow-hidden bg-muted">
                          <img
                              src={bouquet.imageUrl || "/placeholder.svg"}
                              alt={bouquet.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* CONTENT */}
                        <CardContent className="flex flex-1 flex-col p-6">
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {bouquet.name}
                          </h3>

                          {/* Subtle meta info */}
                          <p className="text-sm text-foreground/60 mb-2">
                            {bouquet.chocolateType} • {bouquet.size}
                          </p>

                          <p className="text-sm text-foreground/60 line-clamp-3">
                            {bouquet.description}
                          </p>
                        </CardContent>

                        {/* FOOTER — STICKS TO BOTTOM */}
                        <CardFooter className="mt-auto flex items-center justify-between border-t border-amber-100 bg-white px-6 py-4">
                          <span className="text-lg font-bold text-amber-600">
                            ₹{bouquet.price}
                          </span>

                          {/*<Button*/}
                          {/*    size="sm"*/}
                          {/*    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:opacity-90"*/}
                          {/*>*/}
                          {/*  Order Now*/}
                          {/*</Button>*/}
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            )}
          </div>
        </section>

        {/* Why Bouquets Section — unchanged */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
              Perfect For Every Occasion
            </h2>
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

"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Painting {
  _id: string
  title: string
  artist: string
  price: number
  description: string
  imageUrl: string
}

export default function PaintingsGalleryPage() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)

  const isPaintingsAvailable = false;

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



  return (
      <main className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Portrait Paintings Gallery</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Stunning portrait paintings by Shrutika capturing beauty, emotion, and character in every brushstroke
            </p>
          </div>
        </section>

        {/* Artist Info */}
        <section className="py-16 bg-white border-b border-amber-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">About Shrutika's Paintings</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Each portrait is a masterpiece created with precision and passion. Shrutika uses traditional oil painting
              techniques combined with modern artistic vision to create timeless portraits that capture the essence of her
              subjects.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Custom Portraits", desc: "Personalized based on your photos or vision" },
                { title: "Oil on Canvas", desc: "Professional-grade materials and techniques" },
                { title: "Timeless Art", desc: "Paintings that last for generations" },
              ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-amber-200 bg-amber-50/50">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-foreground/60 text-sm">{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Paintings Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="text-center py-12">
                  <p className="text-amber-700 text-lg">Loading paintings...</p>
                </div>
            ) : paintings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-amber-700 text-lg">No paintings available yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {paintings.map((painting) => (
                      <Card
                          key={painting._id}
                          className="group flex flex-col h-full overflow-hidden border border-amber-200 hover:border-amber-400 transition-all hover:shadow-xl rounded-xl"
                      >
                        {/* IMAGE */}
                        <div className="relative h-64 overflow-hidden bg-muted">
                          <img
                              src={painting.imageUrl || "/placeholder.svg"}
                              alt={painting.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />

                          {/* AVAILABILITY BADGE */}
                          <Badge
                              className={`absolute top-3 right-3 text-xs ${
                                  isPaintingsAvailable
                                      ? "bg-green-600 text-white"
                                      : "bg-gray-500 text-white"
                              }`}
                          >
                            {isPaintingsAvailable ? "Available" : "Unavailable"}
                          </Badge>
                        </div>

                        {/* CONTENT */}
                        <CardContent className="p-6 flex-1">
                          <p className="text-sm text-amber-600 font-semibold mb-2">
                            By {painting.artist}
                          </p>

                          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
                            {painting.title}
                          </h3>

                          <p className="text-sm text-foreground/60 line-clamp-3">
                            {painting.description}
                          </p>
                        </CardContent>

                        {/* FOOTER — ALWAYS AT BOTTOM */}
                        <CardFooter className="p-6 pt-0 mt-auto flex justify-between items-center">
                          <span className="text-lg font-bold text-amber-600">
                            ₹{painting.price}
                          </span>

                          {/*<Button*/}
                          {/*    size="sm"*/}
                          {/*    disabled={!isPaintingsAvailable}*/}
                          {/*    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90"*/}
                          {/*>*/}
                          {/*  Commission*/}
                          {/*</Button>*/}
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            )}
          </div>
        </section>

        {/* Commission Section */}
        <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Commission Your Portrait</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Would you like Shrutika to create a custom portrait? She works with reference photos to capture your vision
              perfectly.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
              Inquire About Custom Portrait
            </button>
          </div>
        </section>

        <Footer />
      </main>
  )
}

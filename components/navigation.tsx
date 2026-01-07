"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
              Cake Artistry
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-amber-700 font-medium transition">
              Home
            </Link>
            <Link href="/cakes-gallery" className="text-foreground hover:text-amber-700 font-medium transition">
              Cakes Gallery
            </Link>
            <Link href="/bouquet-gallery" className="text-foreground hover:text-amber-700 font-medium transition">
              Chocolate Bouquets
            </Link>
            <Link href="/paintings-gallery" className="text-foreground hover:text-amber-700 font-medium transition">
              Paintings
            </Link>
            <Link href="/custom-orders" className="text-foreground hover:text-amber-700 font-medium transition">
              Custom Orders
            </Link>
            <Link href="/artists" className="text-foreground hover:text-amber-700 font-medium transition">
              Our Artists
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Inquire Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Home
            </Link>
            <Link href="/cakes-gallery" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Cakes Gallery
            </Link>
            <Link href="/bouquet-gallery" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Chocolate Bouquets
            </Link>
            <Link href="/paintings-gallery" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Paintings
            </Link>
            <Link href="/custom-orders" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Custom Orders
            </Link>
            <Link href="/artists" className="block px-4 py-2 text-foreground hover:bg-amber-100 rounded">
              Our Artists
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded"
            >
              Inquire Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

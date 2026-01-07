"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-foreground font-semibold text-lg hidden sm:inline">Artistry & Sweets</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="#services" className="text-foreground/80 hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-foreground/80 hover:text-accent transition-colors">
              Portfolio
            </Link>
            <Link href="#about" className="text-foreground/80 hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="#contact" className="text-foreground/80 hover:text-accent transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="#services" className="block text-foreground/80 hover:text-accent py-2">
              Services
            </Link>
            <Link href="#portfolio" className="block text-foreground/80 hover:text-accent py-2">
              Portfolio
            </Link>
            <Link href="#about" className="block text-foreground/80 hover:text-accent py-2">
              About Us
            </Link>
            <Link href="#contact" className="block text-foreground/80 hover:text-accent py-2">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

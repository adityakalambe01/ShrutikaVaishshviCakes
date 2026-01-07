"use client"

import { useEffect, useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

interface SiteSettings {
  logo?: string
  phone?: string
  email?: string
  address?: string
  hours?: string
  instagram?: string
  facebook?: string
  aboutText?: string
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const phone = settings.phone || "+1 (234) 567-890"
  const email = settings.email || "hello@cakeartistry.com"
  const address = settings.address || "123 Art Street, Creative City"

  return (
    <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              Cake Artistry
            </h3>
            <p className="text-white/70">Handcrafted chocolate cakes and artistic creations by Shrutika & Vaishnavi.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/" className="hover:text-amber-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cakes-gallery" className="hover:text-amber-200 transition-colors">
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-amber-200 transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-amber-200 transition-colors">
                  Our Artists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Services</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/cakes-gallery" className="hover:text-amber-200 transition-colors">
                  Premium Cakes
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-amber-200 transition-colors">
                  Custom Designs
                </Link>
              </li>
              <li>
                <Link href="/paintings-gallery" className="hover:text-amber-200 transition-colors">
                  Portrait Paintings
                </Link>
              </li>
              <li>
                <Link href="/bouquet-gallery" className="hover:text-amber-200 transition-colors">
                  Chocolate Bouquets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-amber-200">Contact</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href={`mailto:${email}`} className="hover:text-amber-200 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href={`tel:${phone}`} className="hover:text-amber-200 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; 2026 Cake Artistry. All rights reserved. Crafted with passion by Shrutika & Vaishnavi.</p>
        </div>
      </div>
    </footer>
  )
}

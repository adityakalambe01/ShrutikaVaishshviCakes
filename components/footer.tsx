"use client"

import { useEffect, useState } from "react"
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react"
import Link from "next/link"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {updateSettings} from "@/store/siteSettingsSlice";

export default function Footer() {
  const [loading, setLoading] = useState(true)

  const siteSettings = useSelector((state: RootState)=> state.websiteSettings);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
      const data = await response.json()
      dispatch(updateSettings(data));
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const phone = siteSettings.phone || "+1 (234) 567-890"
  const email = siteSettings.email || "hello@cakeartistry.com"
  const address = siteSettings.address || "123 Art Street, Creative City"

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

            <ul className="space-y-3 text-white/70 mb-4">
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

            {/* SOCIAL ICONS */}
            <div className="flex gap-4">
              {
                  siteSettings.instagram &&
                  <a
                    href={siteSettings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-amber-600/20 hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className="text-white/70 hover:text-amber-200"/>
                  </a>
              }

              { siteSettings.facebook &&
                  <a
                    href={siteSettings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 hover:bg-amber-600/20 hover:scale-110 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} className="text-white/70 hover:text-amber-200"/>
                  </a>
              }
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60 space-y-2">
          <p>
            &copy; 2026 Cake Artistry. All rights reserved. Crafted with passion by Shrutika & Vaishnavi.
          </p>

          <a
              href="https://www.instagram.com/adityakalambe01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/10 hover:text-amber-200 transition-colors duration-500"
          >
            developed by InnoDareDevil
          </a>
        </div>


      </div>
    </footer>
  )
}

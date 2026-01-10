"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import ImageUpload from "./image-upload"
import {SiteSettingsSkeleton} from "@/components/admin/skeletons/SiteSettingsSkeleton";

interface SiteSettings {
  logo: string
  phone: string
  email: string
  address: string
  hours: string
  instagram?: string
  facebook?: string
  aboutText?: string
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>({
    logo: "",
    phone: "",
    email: "",
    address: "",
    hours: "",
    instagram: "",
    facebook: "",
    aboutText: "",
  })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
      const data = await response.json()
      setSettings(data || settings)
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(false)

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  return (
      loading ? <SiteSettingsSkeleton/>
          :
    <Card className="p-6 bg-white border-amber-200">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">Site Settings</h2>

      {saved && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">✓ Settings saved successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Section */}
        <div className="border-b border-amber-200 pb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Logo</h3>
          <ImageUpload
            onUploadComplete={(url) => setSettings({ ...settings, logo: url })}
            currentImage={settings.logo}
            label="Site Logo"
          />
        </div>

        {/* Contact Information */}
        <div className="border-b border-amber-200 pb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Phone Number</label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Email Address</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Business Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Enter your business address"
                rows={2}
                className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Business Hours</label>
              <Input
                value={settings.hours}
                onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                placeholder="e.g., Mon-Sat 10AM - 6PM"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-b border-amber-200 pb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Instagram Profile URL</label>
              <Input
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Facebook Profile URL</label>
              <Input
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                placeholder="https://facebook.com/yourprofile"
              />
            </div>
          </div>
        </div>

        {/* About Text */}
        <div className="border-b border-amber-200 pb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">About Us Text</h3>
          <textarea
            value={settings.aboutText}
            onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
            placeholder="Write about your business..."
            rows={4}
            className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-2 text-base">
          Save Settings
        </Button>
      </form>
    </Card>
  )
}

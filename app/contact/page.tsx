"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const contactInfo = useSelector((state: RootState)=> {
    const {email, phone, address} = state.websiteSettings;
    return {email, phone, address};
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Get In Touch</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you! Reach out to us for inquiries and orders.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Mail, title: "Email", value: contactInfo.email || "hello@cakeartistry.com", href: `mailto:${contactInfo.email || "hello@cakeartistry.com"}` },
              { icon: Phone, title: "Phone", value: contactInfo.phone || "+1 (234) 567-890", href: `tel:${contactInfo.phone || "+1 (234) 567-890"}` },
              { icon: MapPin, title: "Location", value: contactInfo.address || "123 Art Street, Creative City", href: "#" },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="p-8 rounded-xl border border-amber-200 bg-amber-50/50 hover:border-amber-400 transition-all text-center"
                >
                  <Icon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <a href={item.href} className="text-amber-600 hover:text-amber-700 font-medium">
                    {item.value}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Hours & Availability</h3>
                <div className="space-y-4">
                  {[
                    { day: "Monday - Friday", time: "10:00 AM - 6:00 PM" },
                    { day: "Saturday", time: "11:00 AM - 5:00 PM" },
                    { day: "Sunday", time: "Closed" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-amber-200">
                      <span className="text-foreground font-semibold">{item.day}</span>
                      <span className="text-foreground/60">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-amber-200">
                <div className="flex gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Order Timeline</h4>
                    <p className="text-foreground/70 text-sm">
                      For custom orders, we require a minimum of 7 days notice before your event. Faster turnarounds may
                      be available upon request. Please contact us directly to discuss your timeline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-amber-200">
                <h4 className="font-bold text-foreground mb-4">Quick Response</h4>
                <p className="text-foreground/70 mb-4">
                  We try to respond to all inquiries within 24 hours during business hours.
                </p>
                <p className="text-sm text-amber-600 font-semibold">For urgent inquiries, please call us directly!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

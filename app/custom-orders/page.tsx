"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function CustomOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    numberOfGuests: "",
    cakeSizePreference: "",
    cakeDesignDescription: "",
    budget: "",
  })

  const contactInfo = useSelector((state: RootState)=> {
    const {email, phone} = state.websiteSettings;
    return {email, phone};
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Custom order submitted:", formData)
    try {
      const payload = {...formData, eventDate: new Date(formData.eventDate).setHours(0,0,0,0), numberOfGuests: parseInt(formData.numberOfGuests) };
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      setFormData({name: "", email: "", phone: "", eventDate: "", numberOfGuests: "", cakeSizePreference: "", cakeDesignDescription: "", budget: ""})
    }catch (error){
      console.error("Failed to send custom order");
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Custom Cake Orders</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Bring your cake vision to life with our personalized custom orders, including ice cream cakes made
            exclusively by demand
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">Our Process</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", desc: "Discuss your cake ideas and preferences" },
              { step: "2", title: "Design", desc: "Our artists create custom designs for you" },
              { step: "3", title: "Confirmation", desc: "Approve the design and finalize details" },
              { step: "4", title: "Delivery", desc: "Fresh cake delivered on your special day" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-block w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-2xl font-bold flex items-center justify-center mb-4">
                  <div className={'flex justify-center items-center w-full h-full bg-amber-500 overflow-hidden rounded-full'}>
                    {item.step}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ice Cream Cake Info Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border-2 border-amber-400 p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🍦</span> Ice Cream Cakes - Made to Order
            </h3>
            <p className="text-foreground/70 mb-4">
              Want something special? We create beautiful and delicious ice cream cakes exclusively to your
              specifications! Ice cream cakes require advance notice and can be customized with any flavors, toppings,
              and designs you desire.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-foreground/70">
              <div>✓ Custom flavors and combinations</div>
              <div>✓ Minimum 5-7 days advance notice</div>
              <div>✓ Premium storage and delivery</div>
              <div>✓ Perfect for summer celebrations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-amber-200 p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Request Your Custom Cake</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Event Date *</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Number of Guests</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.numberOfGuests}
                    onChange={(e) => setFormData({ ...formData, numberOfGuests: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Cake Size Preference</label>
                  <select
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    value={formData.cakeSizePreference}
                    onChange={(e) => setFormData({ ...formData, cakeSizePreference: e.target.value })}
                  >
                    <option value="" disabled>Select size...</option>
                    <option value="small">Small (4-6 servings)</option>
                    <option value="medium">Medium (10-15 servings)</option>
                    <option value="large">Large (20-30 servings)</option>
                    <option value="xlarge">Extra Large (40+ servings)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Cake Design Description *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your ideal cake design, theme, flavors, colors, decorations, ice cream cakes, etc."
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  value={formData.cakeDesignDescription}
                  onChange={(e) => setFormData({ ...formData, cakeDesignDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Budget</label>
                <select
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">Select budget range...</option>
                  <option value="under50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200plus">$200+</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Submit Custom Order Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Custom Order Details</h2>
              {[
                "Minimum order notice: 7 days before event (5 days for ice cream cakes)",
                "All custom cakes are made with premium ingredients",
                "Pricing varies based on complexity and size",
                "Delivery available within local area",
                "Dietary requirements accommodated",
                "Tasting sessions available upon request",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 mb-4">
                  <span className="text-amber-600 font-bold mt-1">✓</span>
                  <p className="text-foreground/70">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-foreground mb-6">Quick Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <a href={`mailto:${contactInfo.email || "orders@cakeartistry.com"}`} className="text-amber-600 font-semibold hover:underline">
                    {contactInfo.email || "hello@cakeartistry.com"}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Phone</p>
                  <a href={`tel:${contactInfo.phone || "+1234567890"}`} className="text-amber-600 font-semibold hover:underline">
                    {contactInfo.phone || "+1 (234) 567-890"}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Typical Response Time</p>
                  <p className="text-foreground font-semibold">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

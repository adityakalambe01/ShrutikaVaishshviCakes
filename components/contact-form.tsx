"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "portraits",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", service: "portraits", message: "" })
    alert("Thank you for your message! We will get back to you soon.")
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-primary/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-foreground/60 text-lg">Let's bring your artistic vision to life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-xl border border-border">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
              Service Interested In
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors"
            >
              <option value="portraits">Portrait Paintings</option>
              <option value="cakes">Chocolate Cakes</option>
              <option value="bouquets">Chocolate Bouquets</option>
              <option value="custom">Custom Order</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

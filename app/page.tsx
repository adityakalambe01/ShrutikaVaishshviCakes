"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Cake Focused */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-orange-50 via-amber-50 to-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              <span className="block">Exquisite Flavours & Creations</span>
              <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Cakes & Artistry
              </span>
            </h1>

            <p className="text-xl md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Handcrafted cakes, artistic creations, and delectable treats by Shrutika & Vaishnavi.
              Each creation is a masterpiece made with passion and precision.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/cakes-gallery"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                View Our Cakes
              </Link>
              <Link
                href="/custom-orders"
                className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold"
              >
                Order Custom Cake
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Our Cakes?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Premium ingredients, artistic designs, and unforgettable taste
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Handcrafted Designs",
                description:
                  "Every cake is uniquely designed by our talented artists with meticulous attention to detail.",
              },
              {
                title: "Multiple Flavors",
                description:
                  "Choose from chocolate, vanilla, strawberry, red velvet, carrot, coffee, lemon, pistachio and more.",
              },
              {
                title: "Custom Orders",
                description: "Bring your cake dreams to life, including ice cream cakes made exclusively by demand.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-amber-200 bg-amber-50/50 hover:border-amber-400 transition-all"
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <Link href="/cakes-gallery" className="group text-white hover:text-amber-100 transition">
              <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Cakes Gallery</h3>
              <p className="text-white/80">All flavors and styles</p>
            </Link>
            <Link href="/bouquet-gallery" className="group text-white hover:text-amber-100 transition">
              <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                Chocolate Bouquets
              </h3>
              <p className="text-white/80">Elegant gift collections</p>
            </Link>
            <Link href="/paintings-gallery" className="group text-white hover:text-amber-100 transition">
              <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                Paintings Gallery
              </h3>
              <p className="text-white/80">Portrait art by Shrutika</p>
            </Link>
            <Link href="/contact" className="group text-white hover:text-amber-100 transition">
              <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Get In Touch</h3>
              <p className="text-white/80">Contact us for inquiries</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

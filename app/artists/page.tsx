import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Meet Our Artists</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Two talented creators dedicated to bringing joy through art and chocolate
          </p>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Shrutika */}
            <div className="order-2 md:order-1">
              <div className="aspect-square rounded-xl overflow-hidden border-4 border-amber-200">
                <img src="/portrait-of-woman-artist-painting.jpg" alt="Shrutika" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-foreground mb-4">Shrutika</h2>
              <p className="text-lg text-amber-600 font-semibold mb-4">Cake Artist & Painter</p>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Shrutika is a passionate creator with a unique talent for transforming chocolate into edible art. Her
                expertise spans from intricate hand-painted cake designs to stunning portrait paintings that capture
                emotion and beauty.
              </p>

              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
                <h3 className="font-bold text-foreground mb-4">Specialties:</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>✓ Custom portrait paintings</li>
                  <li>✓ Hand-painted cake designs</li>
                  <li>✓ Artistic cake decoration</li>
                  <li>✓ Personalized cake themes</li>
                </ul>
              </div>

              <p className="text-foreground/70">
                With over 5 years of experience, Shrutika brings meticulous detail and artistic flair to every creation,
                making each piece truly one-of-a-kind.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Vaishnavi */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden border-4 border-amber-200">
                <img src="/portrait-of-woman-baker-chocolate.jpg" alt="Vaishnavi" className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Vaishnavi</h2>
              <p className="text-lg text-amber-600 font-semibold mb-4">Master Baker</p>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Vaishnavi is a culinary artist specializing in creating decadent chocolate cakes and treats. Her passion
                for premium ingredients and innovative flavor combinations makes each cake an unforgettable experience.
              </p>

              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-6">
                <h3 className="font-bold text-foreground mb-4">Specialties:</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>✓ Premium chocolate cakes</li>
                  <li>✓ Innovative flavor combinations</li>
                  <li>✓ Chocolate bouquets</li>
                  <li>✓ Custom taste profiles</li>
                </ul>
              </div>

              <p className="text-foreground/70">
                With a background in pastry arts and a love for chocolate, Vaishnavi creates cakes that are as delicious
                as they are beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">Our Collaboration</h2>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            When Shrutika and Vaishnavi work together, magic happens. Their combined expertise in visual artistry and
            culinary excellence creates cakes that are not just desserts, but true works of art. Every custom order
            benefits from their collaborative vision and dedication to perfection.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Artistic Vision", desc: "Combining painting and design expertise" },
              { title: "Premium Quality", desc: "Only the finest ingredients and techniques" },
              { title: "Personal Touch", desc: "Every cake crafted with care and passion" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

import { Palette, Cake } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Palette,
      artist: "Shrutika",
      title: "Portrait Paintings",
      description:
        "Beautiful custom portrait paintings capturing the essence and emotion of your most cherished moments.",
    },
    {
      icon: Cake,
      artist: "Shrutika & Vaishnavi",
      title: "Chocolate Cakes",
      description:
        "Decadent handcrafted chocolate cakes with intricate designs, perfect for celebrations and special occasions.",
    },
    {
      icon: Cake,
      artist: "Shrutika & Vaishnavi",
      title: "Chocolate Bouquets",
      description:
        "Artistic chocolate bouquets combining artistry with delectable treats. A unique gift for someone special.",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Explore our unique offerings crafted with passion and creativity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border bg-card hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-4 inline-block p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                <p className="text-sm text-accent font-semibold mb-2">{service.artist}</p>
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

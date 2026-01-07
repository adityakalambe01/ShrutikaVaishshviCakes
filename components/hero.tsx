export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            <span className="block">Artistic Portraits</span>
            <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              & Chocolate Dreams
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Handcrafted paintings and artisanal chocolate creations by Shrutika and Vaishnavi
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-semibold">
              View Portfolio
            </button>
            <button className="px-8 py-4 border-2 border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-semibold">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
    </section>
  )
}

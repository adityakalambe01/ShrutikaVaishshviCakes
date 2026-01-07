export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Meet The Artists</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-accent mb-3">Shrutika</h3>
                <p className="text-foreground/70 leading-relaxed">
                  A talented portrait painter with a passion for capturing emotions through brushstrokes. With years of
                  experience in traditional and contemporary art, Shrutika creates stunning visual narratives that bring
                  your memories to life. She also crafts exquisite chocolate desserts and bouquets with meticulous
                  attention to detail.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">Vaishnavi</h3>
                <p className="text-foreground/70 leading-relaxed">
                  A master chocolatier and pastry artist who transforms chocolate into edible works of art. Vaishnavi's
                  creations are known for their perfect balance of aesthetics and flavor. Together with Shrutika, she
                  creates magical chocolate cakes and bouquets that delight both the eyes and the palate.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden h-64 bg-accent/10">
              <img src="/artist-shrutika-painting-portrait.jpg" alt="Shrutika" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden h-64 bg-primary/10 mt-8">
              <img src="/chocolate-artist-vaishnavi-with-creations.jpg" alt="Vaishnavi" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

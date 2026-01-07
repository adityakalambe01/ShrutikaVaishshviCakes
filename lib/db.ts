// Database utility for managing content - using JSON file storage
import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

export interface Cake {
  id: string
  name: string
  flavor: string
  description: string
  price: number
  image: string
  category:
    | "chocolate"
    | "vanilla"
    | "strawberry"
    | "red-velvet"
    | "carrot"
    | "coffee"
    | "lemon"
    | "pistachio"
    | "custom"
  createdAt: string
}

export interface Bouquet {
  id: string
  name: string
  description: string
  price: number
  image: string
  createdAt: string
}

export interface Painting {
  id: string
  title: string
  description: string
  price: number
  image: string
  artist: "Shrutika"
  createdAt: string
}

export interface SiteSettings {
  logo: string
  phone: string
  email: string
  address: string
  hours: string
  instagram?: string
  facebook?: string
  aboutText?: string
}

const getDataFile = (type: string) => path.join(dataDir, `${type}.json`)

const readData = (type: string) => {
  try {
    const file = getDataFile(type)
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, "utf-8"))
    }
  } catch (error) {
    console.error(`Error reading ${type} data:`, error)
  }
  return type === "settings" ? {} : []
}

const writeData = (type: string, data: any) => {
  try {
    const file = getDataFile(type)
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${type} data:`, error)
  }
}

export const db = {
  // Cakes
  getCakes: () => readData("cakes"),
  addCake: (cake: Cake) => {
    const cakes = readData("cakes")
    cakes.push(cake)
    writeData("cakes", cakes)
  },
  updateCake: (id: string, cake: Partial<Cake>) => {
    let cakes = readData("cakes")
    cakes = cakes.map((c: Cake) => (c.id === id ? { ...c, ...cake } : c))
    writeData("cakes", cakes)
  },
  deleteCake: (id: string) => {
    let cakes = readData("cakes")
    cakes = cakes.filter((c: Cake) => c.id !== id)
    writeData("cakes", cakes)
  },

  // Bouquets
  getBouquets: () => readData("bouquets"),
  addBouquet: (bouquet: Bouquet) => {
    const bouquets = readData("bouquets")
    bouquets.push(bouquet)
    writeData("bouquets", bouquets)
  },
  updateBouquet: (id: string, bouquet: Partial<Bouquet>) => {
    let bouquets = readData("bouquets")
    bouquets = bouquets.map((b: Bouquet) => (b.id === id ? { ...b, ...bouquet } : b))
    writeData("bouquets", bouquets)
  },
  deleteBouquet: (id: string) => {
    let bouquets = readData("bouquets")
    bouquets = bouquets.filter((b: Bouquet) => b.id !== id)
    writeData("bouquets", bouquets)
  },

  // Paintings
  getPaintings: () => readData("paintings"),
  addPainting: (painting: Painting) => {
    const paintings = readData("paintings")
    paintings.push(painting)
    writeData("paintings", paintings)
  },
  updatePainting: (id: string, painting: Partial<Painting>) => {
    let paintings = readData("paintings")
    paintings = paintings.map((p: Painting) => (p.id === id ? { ...p, ...painting } : p))
    writeData("paintings", paintings)
  },
  deletePainting: (id: string) => {
    let paintings = readData("paintings")
    paintings = paintings.filter((p: Painting) => p.id !== id)
    writeData("paintings", paintings)
  },

  // Site Settings
  getSettings: () => readData("settings"),
  updateSettings: (settings: SiteSettings) => {
    writeData("settings", settings)
  },
}

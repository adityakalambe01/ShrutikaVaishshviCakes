import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Cake } from "@/lib/models/Cake"

export async function GET() {
  try {
    await connectDB()
    const cakes = await Cake.find().sort({ createdAt: -1 })
    return NextResponse.json(cakes)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch cakes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    const cake = new Cake(data)
    await cake.save()

    return NextResponse.json(cake, { status: 201 })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create cake" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Bouquet } from "@/lib/models/Bouquet"

export async function GET() {
  try {
    await connectDB()
    const bouquets = await Bouquet.find({ isDeleted: false }).sort({ createdAt: -1 })
    return NextResponse.json(bouquets)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch bouquets" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    const bouquet = new Bouquet(data)
    await bouquet.save()

    return NextResponse.json(bouquet, { status: 201 })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create bouquet" }, { status: 500 })
  }
}

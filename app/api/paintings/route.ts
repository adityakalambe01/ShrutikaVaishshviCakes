import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Painting } from "@/lib/models/Painting"

export async function GET() {
  try {
    await connectDB()
    const paintings = await Painting.find().sort({ createdAt: -1 })
    return NextResponse.json(paintings)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch paintings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()
    const painting = new Painting(data)
    await painting.save()

    return NextResponse.json(painting, { status: 201 })
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create painting" }, { status: 500 })
  }
}

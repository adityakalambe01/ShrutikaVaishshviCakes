import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Painting } from "@/lib/models/Painting"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()

    const painting = await Painting.findByIdAndUpdate(new Types.ObjectId(params.id), data, { new: true })

    if (!painting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 })
    }

    return NextResponse.json(painting)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update painting" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const painting = await Painting.findByIdAndDelete(new Types.ObjectId(params.id))

    if (!painting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete painting" }, { status: 500 })
  }
}

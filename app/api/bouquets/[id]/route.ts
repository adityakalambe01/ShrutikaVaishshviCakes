import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Bouquet } from "@/lib/models/Bouquet"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const data = await request.json()

    const bouquet = await Bouquet.findByIdAndUpdate(new Types.ObjectId(params.id), data, { new: true })

    if (!bouquet) {
      return NextResponse.json({ error: "Bouquet not found" }, { status: 404 })
    }

    return NextResponse.json(bouquet)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update bouquet" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const bouquet = await Bouquet.findByIdAndDelete(new Types.ObjectId(params.id))

    if (!bouquet) {
      return NextResponse.json({ error: "Bouquet not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete bouquet" }, { status: 500 })
  }
}

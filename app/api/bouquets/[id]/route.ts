import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Bouquet } from "@/lib/models/Bouquet"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const data = await request.json()
    const { id } = await context.params

    const bouquet = await Bouquet.findByIdAndUpdate(id, data, { new: true })

    if (!bouquet) {
      return NextResponse.json({ error: "Bouquet not found" }, { status: 404 })
    }

    return NextResponse.json(bouquet)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update bouquet" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await context.params

    const bouquet = await Bouquet.findByIdAndUpdate(id, {isDeleted: true}, { new: true})

    if (!bouquet) {
      return NextResponse.json({ error: "Bouquet not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete bouquet" }, { status: 500 })
  }
}

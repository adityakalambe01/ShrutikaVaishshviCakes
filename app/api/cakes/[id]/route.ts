import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Cake } from "@/lib/models/Cake"
import { Types } from "mongoose"

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const data = await request.json()
    const { id } = await context.params

    const cake = await Cake.findByIdAndUpdate(id, data, { new: true })

    if (!cake) {
      return NextResponse.json({ error: "Cake not found" }, { status: 404 })
    }

    return NextResponse.json(cake)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update cake" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await context.params

    const cake = await Cake.findByIdAndUpdate(id, {isDeleted: true}, { new: true})

    if (!cake) {
      return NextResponse.json({ error: "Cake not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete cake" }, { status: 500 })
  }
}

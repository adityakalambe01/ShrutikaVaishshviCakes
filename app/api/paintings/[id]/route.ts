import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Painting } from "@/lib/models/Painting"

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const data = await request.json()
    const { id } = await context.params // ✅ FIX

    const painting = await Painting.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })

    if (!painting) {
      return NextResponse.json(
          { error: "Painting not found" },
          { status: 404 }
      )
    }

    return NextResponse.json(painting)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json(
        { error: "Failed to update painting" },
        { status: 500 }
    )
  }
}


export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params // ✅ FIX

    if (!id) {
      return NextResponse.json(
          { error: "Painting ID is required" },
          { status: 400 }
      )
    }

    const painting = await Painting.findByIdAndUpdate(id, {isDeleted: true}, { new: true})

    if (!painting) {
      return NextResponse.json(
          { error: "Painting not found" },
          { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
        { error: "Failed to delete painting" },
        { status: 500 }
    )
  }
}
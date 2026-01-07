import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Settings } from "@/lib/models/Settings"

export async function GET() {
  try {
    await connectDB()
    const settings = await Settings.find()
    const settingsObj: Record<string, any> = {}
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value
    })
    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    for (const [key, value] of Object.entries(data)) {
      await Settings.findOneAndUpdate({ key }, { key, value }, { upsert: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

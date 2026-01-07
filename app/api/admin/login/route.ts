import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminPassword, generateAdminToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (verifyAdminPassword(password)) {
      const token = generateAdminToken()
      return NextResponse.json({ token, success: true })
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

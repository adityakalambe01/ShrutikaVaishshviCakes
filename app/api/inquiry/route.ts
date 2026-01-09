import connectDB from "@/lib/mongodb";
import {type NextRequest, NextResponse} from "next/server";
import {Inquiry} from "@/lib/models/Inquiry";

export async function GET() {
	try {
		await connectDB()
		const inquiries = await Inquiry.find().sort({ createdAt: -1 })
		return NextResponse.json(inquiries)
	} catch (error) {
		console.error("Fetch error:", error)
		return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB()
		const data = await request.json()
		const inquiry = new Inquiry(data)
		await inquiry.save()

		return NextResponse.json(inquiry, { status: 201 })
	} catch (error) {
		console.error("Create error:", error)
		return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
	}
}
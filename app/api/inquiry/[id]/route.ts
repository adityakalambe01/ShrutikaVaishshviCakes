import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import {Inquiry} from "@/lib/models/Inquiry"

export async function PUT(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB()
		const data = await request.json()
		const { id } = await context.params // ✅ FIX

		const inquiry = await Inquiry.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})

		if (!inquiry) {
			return NextResponse.json(
				{ error: "Inquiry not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(inquiry)
	} catch (error) {
		console.error("Update error:", error)
		return NextResponse.json(
			{ error: "Failed to update inquiry" },
			{ status: 500 }
		)
	}
}

export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB()
		const data = await request.json()
		const { id } = await context.params // ✅ FIX

		const inquiry = await Inquiry.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		})

		if (!inquiry) {
			return NextResponse.json(
				{ error: "Inquiry not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json(inquiry)
	} catch (error) {
		console.error("Update error:", error)
		return NextResponse.json(
			{ error: "Failed to update inquiry" },
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

		const inquiry = await Inquiry.findByIdAndDelete(id)

		if (!inquiry) {
			return NextResponse.json(
				{ error: "Inquiry not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Delete error:", error)
		return NextResponse.json(
			{ error: "Failed to delete inquiry" },
			{ status: 500 }
		)
	}
}


export async function GET(
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

		const inquiry = await Inquiry.findById(id)

		if (!inquiry) {
			return NextResponse.json(
				{ error: "Inquiry not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Inquiry error:", error)
		return NextResponse.json(
			{ error: "Failed to find inquiry" },
			{ status: 500 }
		)
	}
}
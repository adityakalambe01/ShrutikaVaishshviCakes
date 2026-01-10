import connectDB from "@/lib/mongodb";
import {type NextRequest, NextResponse} from "next/server";
import {Orders} from "@/lib/models/Orders";

export async function GET() {
	try {
		await connectDB()
		const orders = await Orders.find({ isDeleted: false }).sort({ createdAt: -1 })
		return NextResponse.json(orders)
	} catch (error) {
		console.error("Fetch error:", error)
		return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB()
		const data = await request.json()
		const order = new Orders(data)
		await order.save()

		return NextResponse.json(order, { status: 201 })
	} catch (error) {
		console.error("Create error:", error)
		return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
	}
}
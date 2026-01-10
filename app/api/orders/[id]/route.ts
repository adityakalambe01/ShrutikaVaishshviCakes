import connectDB from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {Orders} from "@/lib/models/Orders";

export async function GET(){
	try{
		await connectDB();

		return NextResponse.json({success: true})
	}catch(error){
		console.error("Fetch error:", error)
		return NextResponse.json({error: "Failed to fetch order"})
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

		const order = await Orders.findByIdAndUpdate(id, {isDeleted: true}, { new: true})

		if (!order) {
			return NextResponse.json(
				{ error: "Order not found" },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Delete error:", error)
		return NextResponse.json(
			{ error: "Failed to delete order" },
			{ status: 500 }
		)
	}
}
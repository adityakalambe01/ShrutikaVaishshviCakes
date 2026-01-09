import connectDB from "@/lib/mongodb";
import {NextResponse} from "next/server";

export async function GET(){
	try{
		await connectDB();

		return NextResponse.json({success: true})
	}catch(error){
		console.error("Fetch error:", error)
		return NextResponse.json({error: "Failed to fetch order"})
	}
}
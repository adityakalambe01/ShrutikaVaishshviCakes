import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import type { UploadApiResponse } from "cloudinary"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "artist-portfolio",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error("No upload result returned"))
          resolve(result)
        }
      ).end(buffer)
    })

    // ✅ Now these ALWAYS exist
    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

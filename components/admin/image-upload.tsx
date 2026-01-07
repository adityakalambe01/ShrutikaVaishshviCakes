"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImage?: string
  label?: string
}

export default function ImageUpload({ onUploadComplete, currentImage, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB")
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onUploadComplete(data.url)
    } catch (err) {
      setError("Failed to upload image")
      setPreview(currentImage || null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-amber-900">{label}</label>

      {preview && (
        <div className="relative w-full h-48 bg-amber-50 rounded-lg overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        variant="outline"
        className="w-full border-amber-300 hover:bg-amber-50"
      >
        {uploading ? "Uploading..." : preview ? "Change Image" : "Select Image"}
      </Button>

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  )
}

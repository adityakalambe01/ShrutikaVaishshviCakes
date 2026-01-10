import mongoose from "mongoose"

const paintingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    dimensions: { type: String, required: true },
    medium: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    commissionAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false}
  },
  { timestamps: true },
)

export const Painting = mongoose.models.Painting || mongoose.model("Painting", paintingSchema)

import mongoose from "mongoose"

const bouquetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    chocolateType: { type: String, required: true },
    size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
    isAvailable: { type: Boolean, default: true },
    occasion: { type: String },
  },
  { timestamps: true },
)

export const Bouquet = mongoose.models.Bouquet || mongoose.model("Bouquet", bouquetSchema)

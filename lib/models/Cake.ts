import mongoose from "mongoose"

const cakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    flavor: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    servings: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, enum: ["Premium", "Custom", "Classic"], default: "Classic" },
    isAvailable: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true },
)

export const Cake = mongoose.models.Cake || mongoose.model("Cake", cakeSchema)

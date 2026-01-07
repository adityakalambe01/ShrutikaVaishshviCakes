import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
)

export const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema)

import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema(
  {
    instituteName: { type: String, required: true },
    coachingType: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

export default mongoose.model("Institute", instituteSchema);

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    type: { type: String, enum: ["booking", "contact", "partnership"], required: true },
    status: { type: String, enum: ["new", "in-progress", "resolved", "closed"], default: "new" },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
    phone: { type: String, trim: true, maxlength: 40 },
    subject: { type: String, trim: true, maxlength: 180 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    propertyId: { type: String, trim: true },
    propertyName: { type: String, trim: true },
    destination: { type: String, trim: true },
    checkIn: { type: String },
    checkOut: { type: String },
    guests: { type: Number, min: 1, max: 30 },
    propertyType: { type: String, trim: true },
    numberOfUnits: { type: Number, min: 1, max: 500 },
    budget: { type: String, trim: true },
    preferredContact: { type: String, enum: ["email", "phone", "whatsapp"], default: "email" },
    internalNotes: { type: String, default: "", maxlength: 4000 }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);

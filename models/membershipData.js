import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["Basic", "Premium", "Gold"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Expired"],
      default: "Pending",
    },
    paymentReceipt: { type: String }, // URL or reference to payment receipt
    paymentDate: { type: Date },
    expirationDate: { type: Date },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Membership ||
  mongoose.model("Membership", membershipSchema);

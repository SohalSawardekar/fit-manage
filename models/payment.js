import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  amount: Number,
  status: String,
  method: String,
  notes: String,
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);

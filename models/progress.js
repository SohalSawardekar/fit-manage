import { Schema, model, models } from "mongoose";

const progressSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Progress = models.Progress || model("Progress", progressSchema);

export default Progress;

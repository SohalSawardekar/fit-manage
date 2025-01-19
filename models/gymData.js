import { Schema, model, models } from "mongoose";

// User Data Schema
const userDataSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },

    // Health Metrics
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bmi: { type: Number, required: true },
    bodyFatPercentage: { type: Number, required: true },
    muscleMass: { type: Number, required: true },

    // Nutrition Insights
    calorieIntake: { type: Number, required: true },
    macros: {
      carbs: { type: Number, required: true },
      protein: { type: Number, required: true },
      fats: { type: Number, required: true },
    },
    recommendedFoods: [{ type: String }],

    // Motivational Quote
    motivationalQuote: { type: String },

    // Emergency Contact
    emergencyContactName: { type: String, required: true },
    emergencyContactRelationship: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt`
);

// Pre-save middleware to update the `updatedAt` field before save
userDataSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to handle user data updates
userDataSchema.statics.updateUserData = async function (userId, updatedData) {
  try {
    const updatedUserData = await this.findOneAndUpdate(
      { userId }, // Find the document by userId
      { $set: updatedData }, // Apply the updated fields
      { new: true, runValidators: true } // Return the updated document and apply validation
    );
    return updatedUserData;
  } catch (err) {
    throw new Error("Error updating user data: " + err.message);
  }
};

// Define the model (using `models` ensures that it will not reinitialize)
const UserData = models.userData || model("userData", userDataSchema);

export default UserData;

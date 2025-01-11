import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  image: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  contactNo: {
    type: String,
  },
  loginType: {
    type: String,
    enum: ["Google", "Password"],
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  paid: {
    type: Boolean,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

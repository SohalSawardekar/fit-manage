import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    image: { type: String },
    createdOn: { type: Date, default: Date.now, required: true },
    lastLoggedIn: { type: Date, default: Date.now, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

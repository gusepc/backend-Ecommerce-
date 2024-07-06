import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: { type: String, default: "user" },
  lastConnection: Date,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;

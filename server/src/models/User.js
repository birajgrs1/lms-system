import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../utils/validators.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [emailRegex, "Invalid email format"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [passwordRegex, "Password must contain uppercase, lowercase, number, special character and be at least 8 characters"]
  },
  role: {
    type: String,
    enum: ["Student", "Instructor", "Unapproved"],
    required: [true, "Role is required"],
    default: "Unapproved"
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  tokenVersion: {
    type: Number,
    default: 0
  },
  resetToken: String,
  resetTokenExpiry: Date
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.tokenVersion;
      delete ret.resetToken;
      delete ret.resetTokenExpiry;
      return ret;
    }
  }
});

const User = mongoose.model("User", userSchema);
export default User;
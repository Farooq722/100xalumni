const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
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
      required: true,
      minlength: 6,
      maxlength: 1000,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "alumni"],
      default: "user",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    profilePhoto: { type: String, default: "https://github.com/shadcn.png" },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo", 
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

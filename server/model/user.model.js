const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    displayName: { type: String },
    photoUrl: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    wishlist: [
      {
        type: String,
        unique: true,
      },
    ], // { type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const model = mongoose.model("User", User);

module.exports = model;

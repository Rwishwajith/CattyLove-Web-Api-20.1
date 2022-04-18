const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        comment: { type: String },
        commentId: { type: mongoose.ObjectId, required: true },
    },
    {
        timestamps: true,
    }
);

const Cat = new mongoose.Schema(
    {
        displayName: { type: String },
        gender: { type: String, enum: ['Male', 'Female'] },
        age: { type: String },
        description: { type: String },
        photoURL: { type: String },
        address: { type: String },
        city: { type: String },
        lat: { type: Number, min: -90, max: 90 },
        lng: { type: Number, min: -180, max: 180 },
        features: { type: Array, default: [], unique: true, required: false },
        likedBy: { type: Array, default: [], unique: true, required: false },
        comments: [Comment],
        owner: { type: String },
    },
    {
        timestamps: true,
        collection: "cats",
    }
);

const model = mongoose.model("Cat", Cat);

module.exports = model;

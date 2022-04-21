require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");
const Cat = require("../models/cat.model");

const mongoose = require("mongoose");


// Get user ID
userRoutes.route("/api/users/:id").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});



//Add to wishlist
userRoutes.route("/api/users/:id/wishlist").post(async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
          wishlist: { $ne: req.body._id },
        },
        {
          $addToSet: { wishlist: req.body._id },
        }
      );
      res.status(responseCodes.ok).json(user);
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  });





module.exports = userRoutes;
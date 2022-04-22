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

/**
 * @swagger
 * /{id}/wishlist:
 *   get:
 *    summary: Get the wishlist of the user by id
 *    tags: [User]
 *   parameters:
 *    - in: path
 *      _id: id
 */

//view wishlist
userRoutes.route("/api/users/:id/wishlist").get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      const wishlist = user.wishlist;
  
      const cats = await Cat.find({ _id: { $in: wishlist } });
  
      res.status(responseCodes.ok).json(cats);
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

  //Remove From wishlist
userRoutes.route("/api/users/:uid/wishlist/:id").delete(async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.uid),
        },
        {
          $pull: { wishlist: mongoose.Types.ObjectId(req.params.id) },
        }
      );
      res.status(responseCodes.ok).json(user);
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  });




module.exports = userRoutes;
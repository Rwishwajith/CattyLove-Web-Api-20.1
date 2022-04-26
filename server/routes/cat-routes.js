require("dotenv").config({ path: "./config.env" });

const express = require("express");

const catRoutes = express.Router();

const Cat = require("../models/cat.model");

const mongoose = require("mongoose");

const responseCodes = require("../models/response-codes");

// Get all cats
catRoutes.route("/api/cats").get(async (req, res) => {
    try {
      const cat = await Cat.find().sort({ createdAt: -1 });
      res.status(responseCodes.ok).json(cat);
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  });
  
  // Get a cat by id
catRoutes.route("/api/cats/:id").get(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    res.status(responseCodes.ok).json(cat);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});


// Create a cat
catRoutes.route("/api/cats").post(async (req, res) => {
  try {
    if (-90 > req.body.lat > 90 && -180 > req.body.lng > 180) {
      res.status(responseCodes.badRequest).json({
        status: "error",
        error: "Latitude and longitude must be between -90 and 90 and -180 and 180",
      });
    } else {
      const cat = await Cat.create(req.body);
      res.status(responseCodes.ok).json(cat);
    }
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Like a cat
catRoutes.route("/api/cats/:id/like").put(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat.likedBy.includes(req.body.uid)) {
      const updatedCat = await cat.updateOne({
        $push: { likedBy: req.body.uid },
      });
      res.status(responseCodes.ok).json(updatedCat);
    } else {
      const updatedCat = await cat.updateOne({
        $pull: { likedBy: req.body.uid },
      });
      res.status(responseCodes.ok).json(updatedCat);
    }
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Delete a cat
catRoutes.route("/api/cats/:id").delete(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    const deletedCat = await cat.deleteOne();
    res.status(responseCodes.ok).json(deletedCat);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Get comments
catRoutes.route("/api/cats/:id/comments").get(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    res.status(responseCodes.ok).json(cat.comments);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Post a comment
catRoutes.route("/api/cats/:id/comments").post(async (req, res) => {
  try {
    const cat = await Cat.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        $addToSet: {
          comments: {
            commentId: mongoose.Types.ObjectId(),
            uid: req.body.uid,
            comment: req.body.comment,
          },
        },
      }
    );
    res.status(responseCodes.ok).json(cat);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

// Delete a comment
catRoutes
  .route("/api/cats/:id/comments/:commentId")
  .delete(async (req, res) => {
    try {
      const cat = await Cat.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
        {
          $pull: {
            comments: {
              commentId: mongoose.Types.ObjectId(req.params.commentId),
            },
          },
        }
      );
      res.status(responseCodes.ok).json(cat);
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  });
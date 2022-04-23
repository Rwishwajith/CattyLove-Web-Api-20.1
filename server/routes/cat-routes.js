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
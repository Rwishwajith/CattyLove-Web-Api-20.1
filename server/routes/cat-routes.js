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
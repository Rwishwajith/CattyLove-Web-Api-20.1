require("dotenv").config({ path: "./config.env" });

const express = require("express");

const catRoutes = express.Router();

const Cat = require("../models/cat.model");

const mongoose = require("mongoose");


// Get all cats
catRoutes.route("/api/cats").get(async (req, res) => {
    try {
      const cat = await Cat.find().sort({ createdAt: -1 });
      res.status(responseCodes.ok).json(cat);
    } catch (err) {
      res.json({ status: "error", error: err.message });
    }
  });
  
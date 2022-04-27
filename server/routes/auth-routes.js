require("dotenv").config({ path: "./config.env" });

const express = require("express");

const authRoutes = express.Router();

const jwt = require("jsonwebtoken");

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");

const bcrypt = require('bcrypt')


// Register a user

authRoutes.route("/api/auth/register").post(async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.status(responseCodes.badRequest).json({ status: "error", error: err.message });
  }
});

// POST authentication API
authRoutes.route("/api/auth/login").post(async (req, res) => {
  try {
    // Check credentials
    const user = await User.findOne({
      email: req.body.email
    });
    // If user exists then Respond OK, send json

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        process.env.JWT_SECRET
      );
      res.status(responseCodes.ok).json({ uid: user._id, token });
    }
    // Else send error message
    else {
      res.status(responseCodes.unauthorized).json({
        error: "Incorrect email or password, Please try again.",
      });
    }
  } catch (err) {
    res.status(responseCodes.badRequest).json({ status: "error", error: err.message });
  }
});

module.exports = authRoutes;
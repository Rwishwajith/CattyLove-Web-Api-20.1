require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");
const Cat = require("../models/cat.model");

const mongoose = require("mongoose");


module.exports = userRoutes;
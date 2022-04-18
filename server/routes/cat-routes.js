require("dotenv").config({ path: "./config.env" });

const express = require("express");

const catRoutes = express.Router();

const Cat = require("../models/cat.model");

const mongoose = require("mongoose");

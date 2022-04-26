require("dotenv").config({ path: "./config.env" });

const express = require("express");

const userRoutes = express.Router();

const responseCodes = require("../models/response-codes");

const User = require("../models/user.model");
const Cat = require("../models/cat.model");

const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *     type: object
 *     required:
 *      - _id
 *      - email
 *      - password
 *     properties:
 *       _id:
 *        type: string
 *       email:
 *        type: string
 *        description: Email of the user
 *        unique: true
 *       password:
 *        type: string
 *        description: Password of the user
 *       photoUrl:
 *        type: string
 *        description: Photo URL of the user
 *       role:
 *        type: string
 *        description: Role of the user
 *       wishlist:
 *        type: array
 *        items:
 *          type: string
 *        description: List of cat ids that the user has in their wishlist
 *       createdAt:
 *        type: string
 *        description: Date of creation of the user
 *       updatedAt:
 *        type: string
 *        description: Date of last update of the user
 * 
 */

/**
 * @swagger
 * /:
 *  get:
 *    summary: Get all users
 *    responses:
 *      200:
 *        description: A array of all users
 *        content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/User'
 */

userRoutes.route("/api/users").get(async (req, res) => {
  try {
    const user = await User.find();
    res.status(responseCodes.ok).json(user);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         _id: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

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

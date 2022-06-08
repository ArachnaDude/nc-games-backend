const express = require("express");
const { getReviewById } = require("../controllers");
const reviewsRouter = express.Router();

reviewsRouter.route("/");

reviewsRouter.route("/:review_id").get(getReviewById);

module.exports = reviewsRouter;

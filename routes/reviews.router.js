const express = require("express");
const { getReviewById, patchReviewById } = require("../controllers");
const { handle405 } = require("../errors");
const reviewsRouter = express.Router();

// TODO
reviewsRouter.route("/");

// controls all methods assigned to /api/reviews/:review_id
reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(patchReviewById)
  .all(handle405);

module.exports = reviewsRouter;

const express = require("express");
const {
  getReviewById,
  patchReviewById,
  getReviews,
  getCommentsByReviewId,
  postCommentByReviewId,
  postReview,
  deleteReviewById,
} = require("../controllers");
const { handle405 } = require("../errors");
const reviewsRouter = express.Router();

// controlls all methods assigned to /api/reviews
reviewsRouter.route("/").get(getReviews).post(postReview).all(handle405);

// controls all methods assigned to /api/reviews/:review_id
reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(patchReviewById)
  .delete(deleteReviewById)
  .all(handle405);

// controlls all methods assigned to /api/reviews/:review_id/comments
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId)
  .all(handle405);

module.exports = reviewsRouter;

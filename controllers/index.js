const { getCategories } = require("./getCategories.controllers");
const { getReviewById } = require("./getReviewById.controllers");
const { patchReviewById } = require("./patchReviewById.controllers");
const { getReviews } = require("./getReviews.controllers");
const {
  getCommentsByReviewId,
} = require("./getCommentsByReviewId.controllers");
const {
  postCommentByReviewId,
} = require("./postCommentByReviewId.controllers");

module.exports = {
  getCategories,
  getReviewById,
  patchReviewById,
  getReviews,
  getCommentsByReviewId,
  postCommentByReviewId,
};

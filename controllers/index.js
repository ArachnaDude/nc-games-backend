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
const { deleteCommentById } = require("./deleteCommentById.controllers");
const { getEndpoints } = require("./getEndpoints.controllers");

module.exports = {
  getCategories,
  getReviewById,
  patchReviewById,
  getReviews,
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteCommentById,
  getEndpoints,
};

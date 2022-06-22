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
const { getUsers } = require("./getUsers.controllers");
const { getUserByUsername } = require("./getUserByUsername.controllers");
const { patchCommentById } = require("./patchCommentById.controllers");
const { postReview } = require("./postReview.controllers");
const { postCategory } = require("./postCategory.controllers");

module.exports = {
  getCategories,
  getReviewById,
  patchReviewById,
  getReviews,
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteCommentById,
  getEndpoints,
  getUsers,
  getUserByUsername,
  patchCommentById,
  postReview,
  postCategory,
};

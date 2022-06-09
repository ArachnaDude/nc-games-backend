const { getCategories } = require("./getCategories.controllers");
const { getReviewById } = require("./getReviewById.controllers");
const { patchReviewById } = require("./patchReviewById.controllers");
const { getReviews } = require("./getReviews.controllers");

module.exports = { getCategories, getReviewById, patchReviewById, getReviews };

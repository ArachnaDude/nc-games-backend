const { deleteReview } = require("../models/deleteReview.models");

exports.deleteReviewById = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    await deleteReview(review_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

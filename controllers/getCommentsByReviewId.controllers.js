const {
  selectCommentsByReviewId,
} = require("../models/selectCommentsByReviewId.models");

exports.getCommentsByReviewId = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const comments = await selectCommentsByReviewId(review_id);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

const {
  selectCommentsByReviewId,
} = require("../models/selectCommentsByReviewId.models");

exports.getCommentsByReviewId = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    console.log("controlla");
    const comments = await selectCommentsByReviewId(review_id);
    res.status(200).send({ comments });
  } catch (error) {
    next(error);
  }
};

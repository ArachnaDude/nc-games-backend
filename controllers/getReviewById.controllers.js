const { selectReviewById } = require("../models/selectReviewById.models");

exports.getReviewById = async (req, res, next) => {
  const { review_id } = req.params;
  try {
    const review = await selectReviewById(review_id);
    res.status(200).send({ review });
  } catch (error) {
    next(error);
  }
};

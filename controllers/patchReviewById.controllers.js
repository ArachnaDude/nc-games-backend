const { updateReviewById } = require("../models/updateReviewById.models");

exports.patchReviewById = async (req, res, next) => {
  const { body, params } = req;
  try {
    const review = await updateReviewById(body.inc_votes, params.review_id);
    res.status(200).send({ review });
  } catch (error) {
    next(error);
  }
};

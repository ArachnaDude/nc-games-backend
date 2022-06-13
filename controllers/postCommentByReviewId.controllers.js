const {
  insertCommentByReviewId,
} = require("../models/insertCommentByReviewId.models");

exports.postCommentByReviewId = async (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  try {
    const comment = await insertCommentByReviewId(username, body, review_id);
    res.status(201).send({ comment });
  } catch (error) {
    next(error);
  }
};

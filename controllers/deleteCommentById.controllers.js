const { deleteComment } = require("../models/deleteComment.models");

exports.deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    const deletedComment = await deletedComment(comment_id);
  } catch (error) {
    next(error);
  }
};

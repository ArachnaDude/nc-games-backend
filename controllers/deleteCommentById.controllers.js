const { deleteComment } = require("../models/deleteComment.models");

exports.deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    await deleteComment(comment_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

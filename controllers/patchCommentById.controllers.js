const { updateCommentById } = require("../models/updateCommentById.models");

exports.patchCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  try {
    const comment = await updateCommentById(comment_id, inc_votes);
    res.status(200).send({ comment });
  } catch (error) {
    next(error);
  }
};

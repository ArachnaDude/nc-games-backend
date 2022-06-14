const express = require("express");
const { deleteCommentById, patchCommentById } = require("../controllers");

const { handle405 } = require("../errors");
const commentsRouter = express.Router();

// controls all methods assinged to /api/comments/:comment_id
commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = commentsRouter;

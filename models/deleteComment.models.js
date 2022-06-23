const db = require("../db/connection");

exports.deleteComment = async (comment_id) => {
  const deletedComment = await db.query(
    `DELETE FROM comments WHERE comment_id = $1;`,
    [comment_id]
  );
  if (!deletedComment.rowCount) {
    return Promise.reject({ status: 404, message: "Not found" });
  }
};

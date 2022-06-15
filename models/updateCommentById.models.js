const db = require("../db/connection");

exports.updateCommentById = async (comment_id, inc_votes = 0) => {
  const comment = await db.query(
    `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`,
    [inc_votes, comment_id]
  );

  if (!comment.rowCount) {
    return Promise.reject({ status: 404, message: "comment not found" });
  }
  return comment.rows[0];
};

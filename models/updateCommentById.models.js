const db = require("../db/connection");

exports.updateCommentById = (comment_id, inc_votes) => {
  console.log(comment_id, inc_votes);
  return db
    .query(
      `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`,
      [inc_votes, comment_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

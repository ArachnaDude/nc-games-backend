const db = require("../db/connection");

exports.insertCommentByReviewId = async (username, body, review_id) => {
  const comment = await db.query(
    `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING comment_id, votes, created_at, author, body;`,
    [username, body, review_id]
  );

  return comment.rows[0];
};

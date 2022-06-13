const db = require("../db/connection");

exports.insertCommentByReviewId = (username, body, review_id) => {
  console.log("model");

  return db
    .query(
      `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING comment_id, votes, created_at, author, body;`,
      [username, body, review_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

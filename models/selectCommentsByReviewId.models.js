const db = require("../db/connection");

exports.selectCommentsByReviewId = (review_id) => {
  console.log(review_id);
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id = $1;`,
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};

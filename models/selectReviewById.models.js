const db = require("../db/connection");

// $1 sanitises the input, guarding against SQL injection.
// Alternatively pg-format's %s would accomplish the same thing.
// However the error code it produces is 42703 (undefined column),
// rather than 22P02 (invalid input).

// All values sanitised in this way need to be in an array.

exports.selectReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT (comments.comment_id) AS "comment_count" 
FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id
WHERE comments.review_id=$1 GROUP BY reviews.review_id;`,
      [review_id]
    )
    .then((result) => {
      console.log(result);
      return result.rows[0];
    });
};

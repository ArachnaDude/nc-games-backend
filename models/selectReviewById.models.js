const db = require("../db/connection");
const format = require("pg-format");

// Format allows sanitising input, so we can't SQL inject.
// Alternatively, we could have used comments.review_id=$1
// which would have had the same effect without using pg-format.

// All values sanitised in this way need to be in an array.

exports.selectReviewById = (review_id) => {
  const sql = format(
    `SELECT reviews.*, COUNT (comments.comment_id) AS "comment_count" 
FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id
WHERE comments.review_id=%s GROUP BY reviews.review_id;`,
    [review_id]
  );
  return db.query(sql).then((result) => {
    console.log(result);
    return result.rows[0];
  });
};

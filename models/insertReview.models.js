const db = require("../db/connection");
const format = require("pg-format");

exports.insertReview = async (
  owner,
  title,
  review_body,
  designer,
  category
) => {
  const queryStr = format(
    `INSERT INTO reviews 
    (owner, title, review_body, designer, category) 
    VALUES (%L) RETURNING *, 0 AS "comment_count"`,
    [owner, title, review_body, designer, category]
  );

  const review = await db.query(queryStr);

  return review.rows[0];
};

const db = require("../db/connection");

exports.updateReviewById = async (body, params) => {
  const review = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
    [body, params]
  );
  return review.rows[0];
};

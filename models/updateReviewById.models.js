const db = require("../db/connection");

exports.updateReviewById = (body, params) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
      [body, params]
    )
    .then((result) => {
      return result.rows[0];
    });
};

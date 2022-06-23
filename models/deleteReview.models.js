const db = require("../db/connection");

exports.deleteReview = async (review_id) => {
  const deletedReview = await db.query(
    `DELETE FROM reviews WHERE review_id = $1 RETURNING *;`,
    [review_id]
  );
  if (!deletedReview.rowCount) {
    return Promise.reject({
      status: 404,
      message: "Not found",
    });
  }
};

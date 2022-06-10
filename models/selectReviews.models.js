const format = require("pg-format");
const db = require("../db/connection");

exports.selectReviews = (category) => {
  console.log("model");
  let queryStr = `SELECT reviews.*,
COUNT (comments.comment_id) AS "comment_count"
FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id`;

  if (category) {
    queryStr += format(
      `
  WHERE reviews.category = %L`,
      [category]
    );
  }

  queryStr += `
  GROUP BY reviews.review_id ORDER BY created_at DESC;`;
  console.log(queryStr);
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

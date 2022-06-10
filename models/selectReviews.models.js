const format = require("pg-format");
const db = require("../db/connection");

exports.selectReviews = (category, sort_by = "created_at", order = "DESC") => {
  const validColumns = [
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "created_at",
    "votes",
    "comment_count",
  ];

  // if (validColumns.includes(sort_by)) {
  // }

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
  GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;
  console.log(queryStr);
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

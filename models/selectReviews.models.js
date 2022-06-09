const db = require("../db/connection");

exports.selectReviews = () => {
  console.log("model");
  return db
    .query(
      `SELECT reviews.owner, 
reviews.title, 
reviews.review_id,
reviews.review_body,
reviews.category,
reviews.review_img_url,
reviews.created_at,
reviews.votes,
COUNT (comments.comment_id) AS "comment_count"
FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id
GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};

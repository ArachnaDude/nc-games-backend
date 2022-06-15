const format = require("pg-format");
const db = require("../db/connection");

// exports.selectReviews = (category, sort_by = "created_at", order = "DESC") => {
//   const validColumns = [
//     "owner",
//     "title",
//     "review_id",
//     "category",
//     "review_img_url",
//     "created_at",
//     "votes",
//     "comment_count",
//   ];

//   const validOrders = ["ASC", "DESC"];

//   if (
//     !validColumns.includes(sort_by.toLowerCase()) ||
//     !validOrders.includes(order.toUpperCase())
//   ) {
//     return Promise.reject({ status: 400, message: "Bad request" });
//   }

//   let queryStr = `SELECT reviews.*,
// COUNT (comments.comment_id) AS "comment_count"
// FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id`;

//   if (category) {
//     queryStr += format(
//       `
//   WHERE reviews.category = %L`,
//       [category]
//     );
//   }

//   queryStr += `
//   GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

//   return db.query(queryStr).then((reviews) => {
//     if (reviews.rowCount) {
//       return reviews.rows;
//     } else {
//       return db
//         .query(`SELECT * FROM categories WHERE slug = $1`, [category])
//         .then((result) => {
//           if (result.rowCount) {
//             return reviews.rows;
//           } else {
//             return Promise.reject({
//               status: 404,
//               message: "category not found",
//             });
//           }
//         });
//     }
//   });
// };

exports.selectReviews = async (
  category,
  sort_by = "created_at",
  order = "DESC"
) => {
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

  const validOrders = ["ASC", "DESC"];

  if (
    !validColumns.includes(sort_by.toLowerCase()) ||
    !validOrders.includes(order.toUpperCase())
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

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

  const reviews = await db.query(queryStr);

  if (reviews.rowCount) {
    return reviews.rows;
  } else {
    const vetCategory = await db.query(
      `SELECT * FROM categories WHERE slug = $1;`,
      [category]
    );
    if (vetCategory.rowCount) {
      return reviews.rows;
    } else {
      return Promise.reject({ status: 404, message: "category not found" });
    }
  }
};

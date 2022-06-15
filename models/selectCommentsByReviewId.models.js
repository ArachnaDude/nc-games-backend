const db = require("../db/connection");

// exports.selectCommentsByReviewId = (
//   review_id,
//   sort_by = "created_at",
//   order = "DESC"
// ) => {
//   const validColumns = ["comment_id", "votes", "created_at", "author", "body"];
//   const validOrders = ["ASC", "DESC"];

//   if (
//     !validColumns.includes(sort_by.toLowerCase()) ||
//     !validOrders.includes(order.toUpperCase())
//   ) {
//     return Promise.reject({ status: 400, message: "Bad request" });
//   }

//   return db
//     .query(
//       `SELECT comment_id,
//       votes,
//       created_at,
//       author,
//       body
//       FROM comments WHERE review_id = $1
//       ORDER BY ${sort_by} ${order};`,
//       [review_id]
//     )
//     .then((result) => {
//       if (result.rowCount) {
//         return result.rows;
//       } else {
//         return db
//           .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
//           .then((answer) => {
//             if (answer.rowCount) {
//               return result.rows;
//             } else {
//               return Promise.reject({
//                 status: 404,
//                 message: "Article not found",
//               });
//             }
//           });
//       }
//     });
// };

exports.selectCommentsByReviewId = async (
  review_id,
  sort_by = "created_at",
  order = "DESC"
) => {
  const validColumns = ["comment_id", "votes", "created_at", "author", "body"];
  const validOrders = ["ASC", "DESC"];

  if (
    !validColumns.includes(sort_by.toLowerCase()) ||
    !validOrders.includes(order.toUpperCase())
  ) {
    return Promise.reject({ status: 400, message: "Bad request" });
  }

  const comment = await db.query(
    `SELECT comment_id, 
      votes, 
      created_at, 
      author, 
      body 
      FROM comments WHERE review_id = $1
      ORDER BY ${sort_by} ${order};`,
    [review_id]
  );

  if (comment.rowCount) {
    return comment.rows;
  } else {
    const vetId = await db.query(
      `SELECT * FROM reviews WHERE review_id = $1;`,
      [review_id]
    );
    if (vetId.rowCount) {
      return comment.rows;
    } else {
      return Promise.reject({
        status: 404,
        message: "Article not found",
      });
    }
  }
};

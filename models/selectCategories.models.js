const db = require("../db/connection");

// exports.selectCategories = () => {
//   return db.query(`SELECT * FROM categories;`).then((result) => {
//     return result.rows;
//   });
// };

exports.selectCategories = async () => {
  const categories = await db.query(`SELECT * FROM categories`);
  return categories.rows;
};

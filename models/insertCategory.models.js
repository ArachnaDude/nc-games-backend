const db = require("../db/connection");

exports.insertCategory = async (slug, description) => {
  const category = await db.query(
    `INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *;`,
    [slug, description]
  );
  return category.rows[0];
};

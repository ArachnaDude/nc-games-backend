const db = require("../db/connection");

exports.selectUserByUsername = async (username) => {
  const user = await db.query(`SELECT * FROM users WHERE username = $1;`, [
    username,
  ]);
  if (!user.rowCount) {
    return Promise.reject({ status: 404, message: "user not found" });
  }
  return user.rows[0];
};

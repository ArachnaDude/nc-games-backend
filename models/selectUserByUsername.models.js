const db = require("../db/connection");

exports.selectUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((result) => {
      if (!result.rowCount) {
        return Promise.reject({ status: 404, message: "user not found" });
      }
      return result.rows[0];
    });
};

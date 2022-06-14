const {
  selectUserByUsername,
} = require("../models/selectUserByUsername.models");

exports.getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await selectUserByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

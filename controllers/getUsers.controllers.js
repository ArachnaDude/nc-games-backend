const { selectUsers } = require("../models/selectUsers.models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

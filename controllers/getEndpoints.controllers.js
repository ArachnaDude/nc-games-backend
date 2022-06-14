const endpoints = require("../endpoints.json");

exports.getEndpoints = async (req, res, next) => {
  try {
    res.status(200).send(endpoints);
  } catch (error) {
    next(error);
  }
};

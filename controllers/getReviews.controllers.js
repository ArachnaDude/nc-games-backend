const { selectReviews } = require("../models/selectReviews.models");

exports.getReviews = async (req, res, next) => {
  console.log(req.query, "req.query");
  try {
    console.log("controller");
    const reviews = await selectReviews();
    res.status(200).send({ reviews });
  } catch (error) {
    next(error);
  }
};

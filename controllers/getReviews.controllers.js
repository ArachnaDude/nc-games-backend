const { selectReviews } = require("../models/selectReviews.models");

exports.getReviews = async (req, res, next) => {
  const { category } = req.query;
  console.log(category, "req.query");
  try {
    console.log("controller");
    const reviews = await selectReviews(category);
    res.status(200).send({ reviews });
  } catch (error) {
    next(error);
  }
};

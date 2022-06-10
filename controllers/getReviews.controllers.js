const { selectReviews } = require("../models/selectReviews.models");

exports.getReviews = async (req, res, next) => {
  const { category, sort_by, order } = req.query;
  // console.log(category, "req.query");
  // console.log(sort_by);
  console.log(order);
  try {
    const reviews = await selectReviews(category, sort_by, order);
    res.status(200).send({ reviews });
  } catch (error) {
    next(error);
  }
};

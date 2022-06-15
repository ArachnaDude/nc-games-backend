const { insertReview } = require("../models/insertReview.models");

exports.postReview = async (req, res, next) => {
  const { owner, title, review_body, designer, category } = req.body;
  try {
    const review = await insertReview(
      owner,
      title,
      review_body,
      designer,
      category
    );
    res.status(201).send({ review });
  } catch (error) {
    next(error);
  }
};

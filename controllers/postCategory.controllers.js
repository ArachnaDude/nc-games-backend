const { insertCategory } = require("../models/insertCategory.models");

exports.postCategory = async (req, res, next) => {
  const { slug, description } = req.body;
  try {
    const category = await insertCategory(slug, description);
    res.status(201).send({ category });
  } catch (error) {
    next(error);
  }
};

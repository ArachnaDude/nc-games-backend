const { selectCategories } = require("../models/selectCategories.models");

exports.getCategories = async (req, res, next) => {
  //this is an async function - selectCategories returns a promise
  try {
    console.log(req.method);
    const categories = await selectCategories();
    res.status(200).send({ categories });
  } catch (error) {
    next(error);
  }
};

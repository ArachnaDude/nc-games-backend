const express = require("express");
const { getCategories, postCategory } = require("../controllers");
const { handle405 } = require("../errors");
const categoriesRouter = express.Router();

// we're alredy in /api (due to apiRouter) /categories (see apiRouter),
// so the path is just /
// .all() matches any method not explicitly specified
// and passes it to handle405
categoriesRouter
  .route("/")
  .get(getCategories)
  .post(postCategory)
  .all(handle405);

module.exports = categoriesRouter;

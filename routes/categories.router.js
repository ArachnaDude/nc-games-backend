const express = require("express");
const { getCategories } = require("../controllers");
const categoriesRouter = express.Router();

// we're alredy in /api (due to apiRouter) /categories (see apiRouter),
// so the path is just /
categoriesRouter.route("/").get(getCategories);

module.exports = categoriesRouter;

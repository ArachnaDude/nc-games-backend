const express = require("express");

const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");

const apiRouter = express.Router();

// everything in here starts with /api
// endpoints are grouped into here to keep
// large APIs managable.

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;

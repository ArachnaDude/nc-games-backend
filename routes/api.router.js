const express = require("express");

const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const { handle405 } = require("../errors");
const { getEndpoints } = require("../controllers");

const apiRouter = express.Router();

// this route is specifically for /api
apiRouter.route("/").get(getEndpoints).all(handle405);

// everything in here starts with /api
// endpoints are grouped into here to keep
// large APIs managable.

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;

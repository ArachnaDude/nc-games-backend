const express = require("express");
const { handle405 } = require("../errors");

const usersRouter = express.Router();

usersRouter.route("/").get().all(handle405);

module.exports = usersRouter;

const express = require("express");
const { getUsers } = require("../controllers/getUsers.controllers");
const { handle405 } = require("../errors");

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers).all(handle405);

module.exports = usersRouter;

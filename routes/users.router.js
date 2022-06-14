const express = require("express");
const { getUsers, getUserByUsername } = require("../controllers");
const { handle405 } = require("../errors");

const usersRouter = express.Router();

// handles all methods associated with /api/users
usersRouter.route("/").get(getUsers).all(handle405);

// handles all methods associated with /api/users/username
usersRouter.route("/:username").get(getUserByUsername).all(handle405);

module.exports = usersRouter;

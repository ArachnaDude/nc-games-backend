const express = require("express");

const { handle405 } = require("../errors");
const commentsRouter = express.Router();

module.exports = commentsRouter;

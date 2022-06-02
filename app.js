// bring in CORS
const cors = require("cors");

// express setup
const express = require("express");
const app = express();

// controller imports
const { getCategories, getReviewById } = require("./controllers");

// required to enable CORS for frontend use
app.use(cors());

// required to parse a body. req.body doesn't exist without this.
app.use(express.json());

// responds with an array of categories
app.get("/api/categories", getCategories);

// responds with a single review object
app.get("/api/reviews/:review_id", getReviewById);

module.exports = app;

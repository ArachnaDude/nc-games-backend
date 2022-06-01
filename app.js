// bring in CORS
const cors = require("cors");

// express setup
const express = require("express");
const app = express();

const { getCategories } = require("./controllers");

// required to enable CORS for frontend use
app.use(cors());

// required to parse a body. req.body doesn't exist without this.
app.use(express.json());

app.get("/api/categories", getCategories);

module.exports = app;

// bring in CORS
const cors = require("cors");

// express setup
const express = require("express");
const app = express();

// controller imports
const { handlePsqlErrors, handleCustomErrors } = require("./errors");
const apiRouter = require("./routes/api.router");

// required to enable CORS for frontend use
app.use(cors());

// required to parse a body. req.body doesn't exist without this.
app.use(express.json());

// middleware that funnels anything that starts with /api into it
app.use("/api", apiRouter);

// error handling routes
app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app;

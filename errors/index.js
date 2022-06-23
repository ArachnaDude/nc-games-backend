exports.handle404 = (req, res, next) => {
  res.status(404).send({ message: "URL not found" });
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ message: "Method not allowed" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  console.log(err, "psql errors");
  const { code } = err;
  if (code === "22P02" || code === "23502" || code === "23505") {
    res.status(400).send({ message: "Bad request" });
  }
  if (code === "23503") {
    res.status(404).send({ message: "Not found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err, "custom errors");
  const { status, message } = err;
  res.status(status).send({ message });
};

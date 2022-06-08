exports.handle404 = (req, res, next) => {};

exports.handle405 = (req, res, next) => {};

exports.handlePsqlErrors = (err, req, res, next) => {
  console.log(err, "psql error");
  const { code } = err;
  if (code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  console.log(err, "custom error");
  const { status, message } = err;
  res.status(status).send({ message });
};

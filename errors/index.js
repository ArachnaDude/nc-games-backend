exports.handle404 = () => {};

exports.handlePsqlErrors = (err, req, res, next) => {
  const { code } = err;
  if (code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status).send({ message });
};

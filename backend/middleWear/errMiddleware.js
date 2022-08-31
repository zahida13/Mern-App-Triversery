const errHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENVIROMENT === "production" ? null : err.message,
  });
};

module.exports = {
  errHandler,
};

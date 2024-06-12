const { SERVER_ERROR } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || SERVER_ERROR;

  return res.status(status).send({ message });
};

module.exports = errorHandler;

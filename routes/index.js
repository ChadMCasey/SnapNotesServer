const router = require("express").Router();
const NotFoundError = require("../utils/errors/NotFoundError");
const { NOT_FOUND_ERROR } = require("../utils/constants");

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});

module.exports = router;

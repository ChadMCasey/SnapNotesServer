const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const { AUTHORIZATION_ERROR } = require("../utils/errors/UnauthorizedError");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError(AUTHORIZATION_ERROR));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new UnauthorizedError(AUTHORIZATION_ERROR));
  }

  req.user = payload;
  return next();
};

module.exports = {
  authorize,
};

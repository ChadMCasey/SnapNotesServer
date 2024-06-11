module.exports = class ConflictError extends Error {
  constructor(message) {
    this.status = 409;
    this.name = "ConflictError";
  }
};

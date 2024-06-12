// external
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
require("dotenv").config();

mongoose.set("strictQuery", true);

// internal
const indexRouter = require("./routes/index");
const requestLimiter = require("./middleware/requestLimiter");
const centralizedError = require("./middleware/centralizedError");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { PORT, DB_ADDRESS } = require("./utils/config");

const app = express();

// connect to DB
mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log("Successfully connected to SnapNotesDB...");
  })
  .catch((err) => {
    console.log(`Connection to SnapNotesDB error: ${err.message}`);
  });

// DDos protection
app.use(requestLimiter);

// secure HTTP headers
app.use(helmet());

// parse incoming req w/ JSON payload
app.use(express.json());

// cross origin resource sharing (CORS)
app.use(cors());

// log inbound request
app.use(requestLogger);

// route to index router
app.use(indexRouter);

// error logger
app.use(errorLogger);

// Joi data validation Error Handling
app.use(errors());

// centralized error handling
app.use(centralizedError);

app.listen(PORT);

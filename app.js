const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sendResponse } = require("./helpers/utils");

const indexRouter = require("./routes/index");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);

//ERROR HANDLERS
//catch when when request match no route
app.use((req, res, next) => {
  const exception = new Error(`Path not found`);
  exception.statusCode = 404;
  next(exception);
});
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode || 500,
      false,
      null,
      { mesage: err.mesage },
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode || 500,
      false,
      null,
      { mesage: err.mesage },
      "Internal Server Error"
    );
  }
  res.status(err.statusCode || 500).send(err.message);
});

const mongoose = require("mongoose");
const { send } = require("process");
/* DB connection*/
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log(err));

module.exports = app;

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// establishing the connection with the database
require("../checkpointApi/config/database").connect();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profiles");
const questionRouter = require("./routes/questions");
const answersRouter = require("./routes/answers");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answersRouter);
module.exports = app;

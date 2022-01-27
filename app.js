var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
// Proxy
var httpProxy = require("http-proxy");

var app = express();

// proxy to API
const apiProxy = httpProxy.createProxyServer({
  target: "http://localhost:3000",
});
app.use("/api", function (req, res) {
  apiProxy.web(req, res);
});
// end proxy

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

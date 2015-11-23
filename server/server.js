"use strict";

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var routing = require("./config/routing");
var app = express();
var router = express.Router();
var port = process.env.PORT || 80;
var env = process.env.NODE_ENV || "dev";
var staticPath = path.join(process.cwd(), (env === "dev" ? "client" : "build"));
// var morganEnv = env === "dev" ? "dev" : "combined";
var morganEnv = "dev";

app.use(morgan(morganEnv)); // Sets logging level
app.use(bodyParser.json()); // Parse post request as JSON
app.use(bodyParser.json({type: "application/vnd.api+json"})); // Use JSON API spec
app.use(express.static(staticPath)); // Set hosted path
app.use("/lib", express.static(path.join(__dirname, "..", "lib")));
app.use("/", router); // Attach router to the base URL
routing(router, staticPath); // Add routing

app.listen(port); // Start listening on port
console.log("Listening on port: " + port);

"use strict";

var path = require("path");
var express = require("express");
var morgan = require("morgan");
var compression = require("compression");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var mongoose = require("mongoose");
var routing = require("./config/routing");
var app = express();
var router = express.Router();
var host = process.env.IP || "127.0.0.1";
var port = process.env.PORT || 80;
var env = process.env.NODE_ENV || "dev";
var staticPath = path.join(__dirname, "..", (env === "dev" ? "client" : "build"));
// var morganEnv = env === "dev" ? "dev" : "combined";
var morganEnv = "dev";

// Mongoose Settings
var mongoCfg = require("./config/mongo")("127.0.0.1");
mongoose.connect(mongoCfg.url);

// Passport Settings
require("./config/passport")(passport);
app.use(session({
    secret: "thecakeisalie",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Express Settings
app.use(morgan(morganEnv)); // Sets logging level
app.use(compression()); // compress all requests
app.use(cookieParser()); // read cookies (required for authentication)
app.use(bodyParser.json()); // Parse post request as JSON
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // Use JSON API spec
app.use(express.static(staticPath)); // Set hosted path
app.use("/lib", express.static(path.join(__dirname, "..", "lib")));
app.use("/", router); // Attach router to the base URL
routing(router, staticPath, passport); // Add routing

app.listen(port, host); // Start listening on port
console.log("Server started at: " + host + ":" + port);

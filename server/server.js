var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routing = require('./routing');
var app = express();
var router = express.Router();
var port = process.env.PORT || 80;
var env = process.env.NODE_ENV || 'dev';
var staticPath = env === 'dev' ? '../clientDev' : '../clientDist';
var morganEnv = env === 'dev' ? 'dev' : 'combined';

app.use(morgan('morganEnv')); // Sets logging level
app.use(bodyParser.json()); // Parse post request as JSON
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // Use JSON API spec
app.use(express.static(staticPath)); // Set hosted path
app.use('/', router); // Attach router to the base URL
routing(router); // Add routing

app.listen(port); // Start listening on port
console.log('Listening on port: ' + port);

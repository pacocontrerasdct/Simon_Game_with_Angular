var express = require('express');
//var path = require('path');
//var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

// Connection to DB
var mongoose = require('mongoose');

// Connecting remotly using mongoLab or connecting locally to my DB
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/simon-game-mean-app';
moongoose.connect(mongoUri);

var routes = require('./config/routes');

//app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.PORT || 3000 )
console.log("Simon App is listening by local port 3000 or remotly!");
var bodyParser  = require('body-parser');
var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var userDAO     = require('./dao/UserDAO').UserDAO;
var messageDAO  = require('./dao/messagesDAO').MessageDAO;
var assert      = require('assert');
//var db          = require('./config/db');
var mongoose    = require('mongoose');

///////////////////////CARGAR SCHEMAS////////////

var infanteria = require("../modelos/schema").inf;
var mecanizada = require("../modelos/schema").mec;
var terreno = require("../modelos/schema").ter;


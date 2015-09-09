var express = require('express');
var compress = require('compression');
var socket = require('socket.io');
var mongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/test';

var db;

mongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("connected to db server");

	db.close();
});

var app = express();

app.use(compress());

var oneDay = 86400000;
oneDay = 0;

app.use(express.static(__dirname + '/../public', { maxAge: oneDay }));

var port = process.env.PORT || 3000;

var io = require('./quizCommunication')(app.listen(port));

//socket.listen(app.listen(port));

console.log('App listening at http://localhost:%s', port);

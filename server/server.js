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

var io = socket.listen(app.listen(port));

console.log('Example app listening at http://localhost:%s', port);


module.exports.io = io; 

io.sockets.on('connection', function(socket) {

    setTimeout(function() {
        socket.emit('setNewQuestion', {questionId: 'id1', questionNumber: 1,
				questionText: 'Which hero has hook shot?',
				answers : ['Spirit Breaker', 'Clockwerk', 'Gyrocopter', 'Storm Spirit'
			]});

				console.log('first question sent...');
    }, 2000);

    socket.on('questionAnswered', function(payload) {
		console.log('questionId: ' + payload.questionId + ', answer: '+ payload.givenAnswer);
        //socket.broadcast.emit('ready');

				socket.emit('setNewQuestion', {questionId: 'id2', questionNumber: 2,
				questionText: 'Does Stengus know how to last hit?',
				answers : ['No, biggest noob, eva!!!1', 'Know, yes. Does he want to? No!', 'Who the fuck is Stengus?'
				]});

				console.log('second question sent...');


    });


	socket.on('name', function(payload) {
		var fingerprint = payload.fingerprint;
		var name = payload.name;

		mongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			var collection = db.collection('identification');
			console.log('fingerprint: ' + fingerprint +', name: '+ name);

			collection.insert({fingerprint: fingerprint, name: name}, function (err, result)
			{
			console.log('testoutput 2');
				if(err) {
				console.log('testoutput 3');
					console.log(err);
				}
				else {
				console.log('testoutput 4');
					console.log('Inserted document');
				}
				db.close();
			});


		});
	});
});

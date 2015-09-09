io = require('./server');

io.sockets.on('connection', function(socket) {

//    setTimeout(function() {
    socket.emit('setNewQuestion', {questionId: 'id1', questionNumber: 1,
			questionText: 'Which hero has hook shot?',
			answers : ['Spirit Breaker', 'Clockwerk', 'Gyrocopter', 'Storm Spirit'
		]});

		console.log('first question sent...');
  //  }, 2000);

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

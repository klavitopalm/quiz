//view controller
angular.module('App').controller('quiz', function($scope, Socket) {
  $scope.isAnswered = false;
  var questionId = -1;
  $scope.questionText = "Waiting for first question...";

  $scope.answer1 = "waiting...";
  $scope.answer2 = "waiting...";
  $scope.answer3 = "waiting...";
  $scope.answer4 = "waiting...";


  Socket.on('setNewQuestion', function(payload) {
    questionId = payload.questionId;
    $scope.questionText = payload.questionText;
    $scope.answer1 = payload.answer1;
    $scope.answer2 = payload.answer2;
    $scope.answer3 = payload.answer3;
    $scope.answer4 = payload.answer4;
    $scope.questionNumber = payload.questionNumber;
  });

    $scope.answerOne = function() {
      Socket.emit('questionAnswered', {questionId: questionId, givenAnswer: 1});
      $scope.isAnswered = true;
      $scope.chosenAnswer = "answer1";
    };

    $scope.answerTwo = function() {
      Socket.emit('questionAnswered', {questionId: questionId, givenAnswer: 2});
      $scope.chosenAnswer = "answer2";
      $scope.isAnswered = true;
    };

    $scope.answerThree = function() {
      Socket.emit('questionAnswered', {questionId: questionId, givenAnswer: 3});
      $scope.chosenAnswer = "answer3";
      $scope.isAnswered = true;
    };

    $scope.answerFour = function() {
      Socket.emit('questionAnswered', {questionId: questionId, givenAnswer: 4});
      $scope.chosenAnswer = "answer4";
      $scope.isAnswered = true;
    };

});

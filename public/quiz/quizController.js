//view controller
angular.module('App').controller('quiz', function($scope, Socket) {
  $scope.isAnswered = false;

    $scope.answer1 = function() {
        $scope.chosenAnswer = "answer1 chosen";
        $scope.isAnswered = true;
    };

    $scope.answer2 = function() {
        $scope.chosenAnswer = "answer2 chosen";
        $scope.isAnswered = true;
    };

});

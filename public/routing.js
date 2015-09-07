//create an app router for url management and redirect
angular.module('App').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/frontpage', {
        templateUrl: 'prototyping/prototyping.html',
        controller: 'frontpage',
    })
	.when('/quiz', {
        templateUrl: 'quiz/quiz.html',
        controller: 'quiz',
    });
    $routeProvider.otherwise({redirectTo: '/frontpage'});
}]);

//frontpage controller
angular.module('App').controller('frontpage', function($scope, Socket) {
   $scope.loading = true;
    $scope.readys = [];

    Socket.on('hello', function(name) {
        $scope.name = name;
        $scope.loading = false;
    });

    Socket.on('ready', function() {
        $scope.readys.push('ready bekommen');
    });

    $scope.setReady = function() {
        Socket.emit('ready');
        $scope.readys.push('ready gesendet!');
    };

	$scope.identify = function() {
		Socket.emit('name', {name: 'Michi', fingerprint: 'asdfi1234'});
	}
});

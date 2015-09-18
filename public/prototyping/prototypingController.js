//frontpage controller
angular.module('App').controller('frontpage', ['$rootScope', '$scope', 'Socket', 'Fingerprint', 'scopeService', function($rootScope, $scope, Socket, Fingerprint, scopeService) {
  $scope.loading = true;
  $scope.readys = [];

  var blubb = function() {
    Fingerprint.object(function(data) {
      scopeService.safeApply($rootScope, function() {
        $scope.fingerprint = data;
      });
    })
  }();

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
    Fingerprint.object(function(data) {
      Socket.emit('name', {name: 'Michi', fingerprint: data});
      console.log('fingerprint: '+ data);
    });
  }
}]);

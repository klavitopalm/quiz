angular.module('Services', []).
factory('Socket', function($rootScope) {
  var socket = io.connect();
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback) {
      if(typeof data == 'function') {
        callback = data;
        data = {};
      }
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    },
    emitAndListen: function(eventName, data, callback) {
      this.emit(eventName, data, callback);
      this.on(eventName, callback);
    }
  };
})
.service('scopeService', function() {
  return {
    safeApply: function ($scope, fn) {
      var phase = $scope.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && typeof fn === 'function') {
          fn();
        }
      } else {
        $scope.$apply(fn);
      }
    },
  };
})
.factory('Fingerprint', function() {

  var isFingerprintAlreadyCalculated = false;
  var fingerprint;
  return {
    object : function(callback) {
      if(isFingerprintAlreadyCalculated) {
        callback(fingerprint);
        return;
      }

      new Fingerprint2().get(function(result) {
        isFingerprintAlreadyCalculated = true;
        fingerprint = result;
        callback(result);
      });
    }
  }
});

(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('GradingCtrl', function($scope, $rootScope, $http, $cookies) {
    $rootScope.title = 'ผลการสอบ';
    return $http.get('http://localhost/users/' + $cookies.get('current_user')).success(function(data) {
      var s, _i, _len, _ref, _results;
      $scope.user = data;
      $scope.scores = [];
      _ref = $scope.user.scores;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        _results.push($http.get('http://localhost/scores/' + s).success(function(score_data) {
          return $scope.scores.push(score_data);
        }));
      }
      return _results;
    });
  });

}).call(this);

/*
//@ sourceMappingURL=grading.js.map
*/
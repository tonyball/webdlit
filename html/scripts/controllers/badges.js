(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('BadgesCtrl', function($scope, $http, $rootScope) {
    $rootScope.title = 'เหรียญ';
    $scope.earths = [];
    $scope.moons = [];
    $scope.blackholes = [];
    $scope.suns = [];
    $scope.meteorites = [];
    return $http({
      method: 'GET',
      url: 'http://localhost/badges'
    }).success(function(badges_data) {
      var bd, _i, _len, _results;
      $scope.badges = badges_data;
      _results = [];
      for (_i = 0, _len = badges_data.length; _i < _len; _i++) {
        bd = badges_data[_i];
        if (bd.group === 'earth') {
          _results.push($scope.earths.push(bd));
        } else if (bd.group === 'moon') {
          _results.push($scope.moons.push(bd));
        } else if (bd.group === 'blackhole') {
          _results.push($scope.blackholes.push(bd));
        } else if (bd.group === 'sun') {
          _results.push($scope.suns.push(bd));
        } else if (bd.group === 'meteorite') {
          _results.push($scope.meteorites.push(bd));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  });

}).call(this);

/*
//@ sourceMappingURL=badges.js.map
*/
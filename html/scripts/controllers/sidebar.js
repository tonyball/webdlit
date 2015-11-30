(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('SidebarCtrl', function($scope, $location) {
    return $scope.isActive = function(viewLocation) {
      var location;
      location = $location.path().split('/');
      return viewLocation === "/" + location[1];
    };
  });

}).call(this);

/*
//@ sourceMappingURL=sidebar.js.map
*/
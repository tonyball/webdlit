(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('navigationBar', function($cookies, $route, $http, $rootScope) {
    return {
      templateUrl: 'views/navigation-bar.html',
      restrict: 'E',
      link: function(scope) {
        $rootScope.notification_details = [];
        $rootScope.allisread = true;
        $http.get('http://localhost/notifications').success(function(notification_data) {
          var notifications, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = notification_data.length; _i < _len; _i++) {
            notifications = notification_data[_i];
            if ($cookies.get('current_user') === notifications.receiver) {
              _results.push($http.get('http://localhost/notifications/' + notifications._id).success(function(notification_detail) {
                if (notification_detail.status === false) {
                  $rootScope.allisread = false;
                }
                return $rootScope.notification_details.push(notification_detail);
              }));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        scope.showSidenav = function() {
          angular.element('#side-nav,.top,.bottom').fadeToggle();
          return false;
        };
        scope.signout = function() {
          $cookies.remove('current_user');
          $cookies.remove('reloaded');
          $route.reload();
          window.location.reload();
          return false;
        };
        scope.setAsRead = function(notification) {
          notification.status = true;
          $rootScope.allisread = true;
          $http.put('http://localhost/notifications/' + notification._id, notification);
          return false;
        };
        return angular.element(".dropdown-button").dropdown({
          hover: false,
          belowOrigin: true
        });
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=navigation-bar.js.map
*/
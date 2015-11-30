(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('DashboardCtrl', function($scope, $rootScope, $http, $timeout, $route, $location, $cookies, randomString) {
    $rootScope.title = 'กระดานหลัก';
    $scope.user_classrooms = [];
    $scope.$on('$routeChangeStart', function(next, current) {
      angular.element('#loadingMask').show();
      return false;
    });
    $scope.$on('$routeChangeSuccess', function(scope, next, current) {
      $timeout((function() {
        angular.element('#loadingMask').hide();
        return false;
      }), 0);
      return false;
    });
    $scope.hideSidenav = function() {
      angular.element('#side-nav,.top,.bottom').fadeOut();
      return false;
    };
    $scope.showSearch = function() {
      angular.element('#search-modal').openModal();
      return false;
    };
    $scope.showCreateClassroom = function() {
      $scope.class_title = '';
      $scope.class_image = '';
      $scope.class_teacher_name = '';
      $scope.class_subject = '';
      angular.element('#new-classroom').show();
      return false;
    };
    angular.element('.tooltipped').tooltip({
      delay: 50
    });
    angular.element('.button-collapse').sideNav({
      closeOnClick: true,
      menuWidth: 330
    });
    angular.element(".slide-out-user-button").sideNav({
      closeOnClick: true,
      menuWidth: 300,
      edge: 'right'
    });
    angular.element(".dropdown-button").dropdown({
      hover: false,
      belowOrigin: true
    });
    angular.element(".mini-dropdown-button").dropdown({
      hover: false,
      belowOrigin: true,
      constrain_width: false
    });
    angular.element(".noti-dropdown-button").dropdown({
      hover: true,
      belowOrigin: true
    });
    if ($cookies.get('current_user') === void 0) {
      return $location.path('intro');
    } else {
      return $http.get('http://localhost/users/' + $cookies.get('current_user')).success(function(current_user_data) {
        var uc, _i, _len, _ref, _results;
        $rootScope.current_user = current_user_data;
        $scope.user = $rootScope.current_user;
        if ($scope.user.role === '1' || $scope.user.role === true) {
          $rootScope.isTeacher = true;
        } else if ($scope.user.role === '0' || $scope.user.role === false) {
          $rootScope.isStudent = true;
        }
        _ref = $scope.user.classrooms;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          uc = _ref[_i];
          _results.push($http.get('http://localhost/classrooms/' + uc).success(function(class_data) {
            var std, _j, _len1, _ref1;
            class_data.std_details = [];
            _ref1 = class_data.students;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              std = _ref1[_j];
              $http.get('http://localhost/users/' + std).success(function(std_data) {
                return class_data.std_details.push(std_data);
              });
            }
            return $scope.user_classrooms.push(class_data);
          }));
        }
        return _results;
      });
    }
  });

}).call(this);

/*
//@ sourceMappingURL=dashboard.js.map
*/
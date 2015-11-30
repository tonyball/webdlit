(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('SignupCtrl', function($scope, $rootScope, $http, $location, $cookies) {
    $rootScope.title = "ลงทะเบียน";
    $scope.user_in_db = [];
    $http.get('http://localhost/users').success(function(data) {
      return $scope.user_in_db = data;
    });
    $scope.user_data = {
      "title": "",
      "school": "",
      "role": "0",
      "gender": "ชาย",
      "tel": "",
      "education_level": "",
      "bio": "",
      "location": "",
      "created": "",
      "modified": "",
      "citizenid": "",
      "avatar-group": "",
      "avatar": "red1.png",
      "classrooms": [],
      "courses": [],
      "activities": [],
      "badges": [],
      "scores": []
    };
    $scope.checkConfirm = function($event) {
      if ($scope.user_data.confirmpassword !== $scope.user_data.password) {
        angular.element('#password,#confirmpassword').removeClass('valid').addClass('invalid');
      } else if ($scope.user_data.password.length < 8) {
        angular.element('#password,#confirmpassword').removeClass('valid').addClass('invalid');
      } else {
        angular.element('#password,#confirmpassword').addClass('valid').removeClass('invalid');
      }
      return false;
    };
    $scope.checkDuplicateUsername = function() {
      var user, _i, _len, _ref;
      _ref = $scope.user_in_db;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        if ($scope.user_data.username === user.username || ($scope.user_data.username.length < 4 || $scope.user_data.username.length > 16)) {
          angular.element('#username').addClass('invalid').removeClass('validate');
          return false;
        }
      }
      angular.element('#username').addClass('valid').removeClass('invalid');
      return false;
    };
    $scope.checkDuplicateEmail = function() {
      var user, _i, _len, _ref;
      _ref = $scope.user_in_db;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        if ($scope.user_data.email === user.email) {
          angular.element('#email').addClass('invalid').removeClass('validate');
          return false;
        }
      }
      angular.element('#email').addClass('valid').removeClass('invalid');
      return false;
    };
    return $scope.signup = function() {
      return $http.post('http://localhost/users/', $scope.user_data).success(function(data) {
        $cookies.put('current_user', data.username);
        $rootScope.current_user = data;
        return $location.path('/settings');
      });
    };
  });

}).call(this);

/*
//@ sourceMappingURL=signup.js.map
*/
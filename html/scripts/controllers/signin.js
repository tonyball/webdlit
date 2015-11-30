(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('SigninCtrl', function($scope, $rootScope, $route, $http, $cookies) {
    $rootScope.title = "เข้าสู่ระบบ";
    $rootScope.isStudent = false;
    $rootScope.isTeacher = false;
    $rootScope.current_user = "";
    $scope.username = "";
    $scope.password = "";
    return $scope.signin = function() {
      return $http.get('http://localhost/users/' + $scope.username).success(function(data_user) {
        if (data_user.password === $scope.password) {
          $cookies.put('current_user', data_user.username);
          $rootScope.current_user = data_user;
          $route.reload();
          window.location.href = '#/dashboard';
          window.location.reload();
        } else {
          Materialize.toast('<span class=red-text lighten-text-2>รหัสผ่านไม่ถูกต้อง</span>', 2000);
          angular.element('#password').addClass('invalid');
        }
        return false;
      }).error(function() {
        Materialize.toast('<span class=red-text lighten-text-2>ชื่อผู้ใช้ไม่ถูกต้อง</span>', 2000);
        angular.element('#username').addClass('invalid');
        return false;
      });
    };
  });

}).call(this);

/*
//@ sourceMappingURL=signin.js.map
*/
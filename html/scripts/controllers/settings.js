(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('SettingsCtrl', function($scope, $rootScope, $http) {
    $rootScope.title = "ตั้งค่าบัญชีผู้ใช้";
    $http.get('http://localhost/users/' + $rootScope.current_user.username).success(function(user_data) {
      return $scope.user = user_data;
    });
    $scope.changePassword = function() {
      if ($scope.current_password === $scope.user.password) {
        if ($scope.new_password === $scope.confirm_password) {
          $scope.user.password = $scope.new_password;
          return $http.put('http://localhost/users/' + $scope.user.username, $scope.user).success(function(data) {
            $scope.user = data;
            return Materialize.toast('<span class=green-text lighten-text-2>อัพเดทข้อมูลเรียบร้อยแล้ว</span>', 2000);
          });
        } else {
          return Materialize.toast('<span class=red-text lighten-text-2>รหัสผ่านใหม่ไม่ตรงกับที่ยืนยัน</span>', 2000);
        }
      } else {
        return Materialize.toast('<span class=red-text lighten-text-2>รหัสผ่านเก่าไม่ถูกต้อง</span>', 2000);
      }
    };
    return $scope.saveProfile = function() {
      return $http.put('http://localhost/users/' + $scope.user.username, $scope.user).success(function(data) {
        return Materialize.toast('<span class=green-text lighten-text-2>อัพเดทข้อมูลเรียบร้อยแล้ว</span>', 2000);
      });
    };
  });

}).call(this);

/*
//@ sourceMappingURL=settings.js.map
*/
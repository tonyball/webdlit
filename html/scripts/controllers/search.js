(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('SearchCtrl', function($scope, $rootScope, $location, $http, $route) {
    $rootScope.title = "ผลการค้นหา " + $location.search().q;
    $scope.classcode = $location.search().q;
    $http.get('http://localhost/classrooms/' + $scope.classcode).success(function(class_data) {
      return $scope.classroom = class_data;
    });
    return $scope.verifyingCode = function() {
      if ($scope.classroom.verification_code === $scope.verification_code) {
        $scope.classroom.students.push($rootScope.current_user.username);
        $rootScope.current_user.classrooms.push($scope.classroom.code);
        return $http.put('http://localhost/classrooms/' + $scope.classroom.code, $scope.classroom).success(function(data) {
          return $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {
            scope.addNewStd = false;
            $route.reload();
            return window.location.reload();
          });
        });
      } else {
        return alert('รหัสยืนยันไม่ถูกต้อง');
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=search.js.map
*/
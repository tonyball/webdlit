'use strict'

angular.module('newkruDlitApp')
  .controller 'SearchCtrl', ($scope, $rootScope, $location, $http, $route) ->
  	$rootScope.title = "ผลการค้นหา "+$location.search().q
  	$scope.classcode = $location.search().q

  	$http.get('http://localhost/classrooms/'+$scope.classcode).success (class_data) ->
      $scope.classroom = class_data

   	$scope.verifyingCode = ->
   		if $scope.classroom.verification_code == $scope.verification_code
        $scope.classroom.students.push $rootScope.current_user.username
        $rootScope.current_user.classrooms.push $scope.classroom.code
        $http.put('http://localhost/classrooms/'+$scope.classroom.code, $scope.classroom).success (data) ->
          $http.put('http://localhost/users/'+$rootScope.current_user.username, $rootScope.current_user).success ->
            scope.addNewStd = false
            $route.reload()
            window.location.reload()
      else 
        alert 'รหัสยืนยันไม่ถูกต้อง'
'use strict'

angular.module('newkruDlitApp')
  .controller 'SettingsCtrl', ($scope, $rootScope, $http) ->
  	$rootScope.title = "ตั้งค่าบัญชีผู้ใช้"
  	$http.get('http://localhost/users/'+$rootScope.current_user.username).success (user_data) ->
  		$scope.user = user_data

  	$scope.changePassword = ->
  		if $scope.current_password == $scope.user.password
  			if $scope.new_password == $scope.confirm_password
  				$scope.user.password = $scope.new_password
  				$http.put('http://localhost/users/'+$scope.user.username, $scope.user).success (data) ->
  					$scope.user = data
  					Materialize.toast('<span class=green-text lighten-text-2>อัพเดทข้อมูลเรียบร้อยแล้ว</span>', 2000)
  			else
  				Materialize.toast('<span class=red-text lighten-text-2>รหัสผ่านใหม่ไม่ตรงกับที่ยืนยัน</span>', 2000)
  		else
  			Materialize.toast('<span class=red-text lighten-text-2>รหัสผ่านเก่าไม่ถูกต้อง</span>', 2000)

  	$scope.saveProfile = ->
  		$http.put('http://localhost/users/'+$scope.user.username, $scope.user).success (data) ->
  			Materialize.toast('<span class=green-text lighten-text-2>อัพเดทข้อมูลเรียบร้อยแล้ว</span>', 2000)

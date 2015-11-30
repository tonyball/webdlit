'use strict'

angular.module('newkruDlitApp')
  .controller 'GradingCtrl', ($scope,$rootScope,$http,$cookies) ->
    $rootScope.title = 'ผลการสอบ'
    $http.get('http://localhost/users/'+$cookies.get('current_user')).success (data) ->
    	$scope.user = data
    	$scope.scores = []
    	for s in $scope.user.scores
    		$http.get('http://localhost/scores/'+s).success (score_data) ->
    			$scope.scores.push score_data
    			
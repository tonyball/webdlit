'use strict'

angular.module('newkruDlitApp')
.controller 'GradingTestCtrl', ($scope,$rootScope,$http,$cookies,$routeParams,$route) ->
	$rootScope.title = 'ผลสอบเรื่อง'
	$scope.editorOptions = {language: 'th', uiColor: '#ffffff', height:'150'}
	$http.get('http://localhost/scores/'+$routeParams.testid).success (score_data) ->
		$http.get('http://localhost/users/'+score_data.username).success (user_data) ->
			$scope.user = user_data
			$scope.score = score_data
			$rootScope.title += $scope.score.test_name
			angular.element('#pdf-item').attr('data','contents/'+$scope.score.course_code+'/Simulation Test/'+$scope.score.course_code+'-Key.pdf')

	$scope.updateToCommented = ->
		$scope.score.status = 'commented'
		notify = {sender:$cookies.get('current_user'),receiver:$scope.user.username,content:'คะแนนสอบ'+$scope.score.test_name+' ('+$scope.score.score_id+') ได้รับการยืนยันเรียบร้อยแล้ว กรุณาเข้าไปดูความเห็นและคำแนะนำจากครูผู้สอน' ,status:0,url:'#/grading/'+$scope.score.score_id}
		$http.post('http://localhost/notifications', notify)
		$http.put('http://localhost/scores/'+$routeParams.testid, $scope.score).success (score_data) ->
			$scope.score = score_data
			$route.reload()
		return false

	$scope.addCommentByProblem = ->
		$http.put('http://localhost/scores/'+$routeParams.testid, $scope.score).success (score_data) ->
			$scope.score = score_data
			$route.reload()
		return false

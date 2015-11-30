'use strict'

angular.module('newkruDlitApp')
  .controller 'NotificationsCtrl', ($scope, $rootScope, $http) ->
  	$rootScope.title = 'การแจ้งเตือน'
  	# $rootScope.notification_details = []

  	# $http.get('http://localhost/notifications/').success (notification_data) ->
  	# 	for notifications in notification_data
  	# 		if $rootScope.current_user.username == notifications.receiver
  	# 			$http.get('http://localhost/notifications/'+notifications._id).success (notification_detail) ->
  	# 				$rootScope.notification_details.push notification_detail
'use strict'

angular.module('newkruDlitApp')
  .controller 'ReadMessageCtrl', ($scope,$rootScope,$http,$routeParams) ->
    $rootScope.title = 'ตอบกลับข้อความ'
    $scope.editorOptions = {language: 'th', uiColor: '#ffffff', height:'150'}
    $http.get('http://localhost/messages/'+$routeParams.messageid).success (message_data) ->
        $scope.message = message_data
        $http.get('http://localhost/messages').success (data) ->
            for d in data
                if $scope.message.reply_to == d._id
                    $scope.message.reply_to = d

    $scope.reply = ->
    	msg_id = Math.floor((Math.random()*90000)+10000)
    	message = {message_id:msg_id,sender:$rootScope.current_user.username,receiver:$scope.message.sender,message:$scope.text_message,status:0,url:'#/messages/'+msg_id,reply_to:$scope.message}
    	notify = {sender:$rootScope.current_user.username,receiver:$scope.message.sender,content:$rootScope.current_user.username+' ได้ตอบกลับข้อความของคุณ' ,status:0,url:'#/messages/'+msg_id}
    	$http.post('http://localhost/messages',message).success (data) ->
    		alert 'ตอบข้อความเรียบร้อยแล้ว'
    		$scope.text_message = ''
    	$http.post('http://localhost/notifications',notify)
    	return false


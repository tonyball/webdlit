'use strict'

angular.module('newkruDlitApp')
  .directive('profileDetail',($http,$rootScope) ->
    templateUrl: 'views/pages/profile-detail.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.openBadgesContainer = ->
            angular.element('.all-badges-container').show()
            for b in scope.user.show_badges
                angular.element('#badge'+b.id).addClass('selected-badge')
            return false
        scope.showBadgeDetail = (id) ->
            angular.element('#details-of-'+id).openModal()
            return false
        scope.showTooltip = ->
            angular.element('.tooltipped').tooltip({delay: 50})
            return false
        scope.sendMessage = ->
            msg_id = Math.floor((Math.random()*90000)+10000)
            message = {message_id:msg_id,sender:$rootScope.current_user.username,receiver:scope.user.username,message:scope.text_message,status:0,url:'#/messages/'+msg_id}
            notify = {sender:$rootScope.current_user.username,receiver:scope.user.username,content:$rootScope.current_user.username+' ได้ส่งข้อความถึงคุณ' ,status:0,url:'#/messages/'+msg_id}
            $http.post('http://localhost/messages',message).success (data) ->
                alert 'ส่งข้อความเรียบร้อยแล้ว'
                scope.text_message = ''
            $http.post('http://localhost/notifications',notify)
            return false
  )

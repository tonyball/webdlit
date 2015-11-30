'use strict'

angular.module('newkruDlitApp')
  .directive('navigationBar', ($cookies,$route,$http, $rootScope) ->
    templateUrl: 'views/navigation-bar.html'
    restrict: 'E',
    link: (scope) ->
        $rootScope.notification_details = []
        $rootScope.allisread = true
        $http.get('http://localhost/notifications').success (notification_data) ->
            for notifications in notification_data
                if $cookies.get('current_user') == notifications.receiver
                    $http.get('http://localhost/notifications/'+notifications._id).success (notification_detail) ->
                        if notification_detail.status == false
                            $rootScope.allisread = false
                        $rootScope.notification_details.push notification_detail
        scope.showSidenav = ->
            angular.element('#side-nav,.top,.bottom').fadeToggle()
            return false
        scope.signout = ->
            $cookies.remove('current_user')
            $cookies.remove('reloaded')
            $route.reload()
            window.location.reload()
            return false
        scope.setAsRead = (notification) ->
            notification.status = true
            $rootScope.allisread = true
            $http.put('http://localhost/notifications/'+notification._id, notification)
            return false
        angular.element(".dropdown-button").dropdown({hover: false,belowOrigin: true})
  )

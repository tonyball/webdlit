'use strict'

angular.module('newkruDlitApp')
  .controller 'DashboardCtrl', ($scope, $rootScope, $http, $timeout, $route, $location, $cookies,randomString ) ->
    $rootScope.title = 'กระดานหลัก'

    $scope.user_classrooms = []


    $scope.$on '$routeChangeStart', (next, current) ->
    	angular.element('#loadingMask').show()
    	return false

    $scope.$on '$routeChangeSuccess', (scope, next ,current) ->
    	$timeout (->
    		angular.element('#loadingMask').hide()
    		return false
    	), 0
    	return false

    $scope.hideSidenav = ->
    	angular.element('#side-nav,.top,.bottom').fadeOut()
    	return false
    $scope.showSearch = ->
        angular.element('#search-modal').openModal()
        return false
    $scope.showCreateClassroom = ->
        $scope.class_title = ''
        $scope.class_image = ''
        $scope.class_teacher_name = ''
        $scope.class_subject = ''
        angular.element('#new-classroom').show()
        return false

    angular.element('.tooltipped').tooltip({delay: 50})
    angular.element('.button-collapse').sideNav({closeOnClick: true, menuWidth: 330})
    angular.element(".slide-out-user-button").sideNav({closeOnClick: true, menuWidth: 300, edge: 'right'})
    angular.element(".dropdown-button").dropdown({hover: false,belowOrigin: true})
    angular.element(".mini-dropdown-button").dropdown({hover: false,belowOrigin: true,constrain_width: false})
    angular.element(".noti-dropdown-button").dropdown({hover: true,belowOrigin: true})

    if $cookies.get('current_user') == undefined
        $location.path 'intro'
    else
        $http.get('http://localhost/users/'+$cookies.get('current_user')).success (current_user_data) ->
            $rootScope.current_user = current_user_data
            $scope.user = $rootScope.current_user
            if $scope.user.role == '1' or $scope.user.role == true
                $rootScope.isTeacher = true
            else if $scope.user.role == '0' or $scope.user.role == false
                $rootScope.isStudent = true
            for uc in $scope.user.classrooms
                $http.get('http://localhost/classrooms/'+uc).success (class_data) ->
                    class_data.std_details = []
                    for std in class_data.students
                        $http.get('http://localhost/users/'+std).success (std_data) ->
                            class_data.std_details.push std_data
                    $scope.user_classrooms.push class_data

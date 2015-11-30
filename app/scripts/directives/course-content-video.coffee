'use strict'

angular.module('newkruDlitApp')
  .directive('courseContentVideo', ($http, $rootScope) ->
    templateUrl: 'views/pages/course-content-video.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.addActivity = (content, course, coursecode, action) ->
            if scope.isAdded == false
                activity = {datetime: new Date(), activity: action+" เรื่อง"+content+" ของหลักสูตร"+course+" ("+coursecode+")",type:"video"}
                $rootScope.current_user.activities.push activity
                $http.put('http://localhost/users/'+$rootScope.current_user.username, $rootScope.current_user).success ->
            scope.isAdded = true
            return false
  )

'use strict'

angular.module('newkruDlitApp')
  .directive('classroomNewCourse', ($http, $location, randomString) ->
    templateUrl: 'views/pages/classroom-new-course.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.addCourse = (file) ->
            code_f = randomString(3)
            code_b = Math.floor((Math.random()*9000)+1000)
            # http to write image file on disk api goes here ...
            $http.post('http://localhost/course/', scope.course).success (data) ->
                $location.path('/classroom/'+code)
            return false
        scope.hideCreateCourse = ->
            angular.element('#new-course').slideUp()
            return false
  )

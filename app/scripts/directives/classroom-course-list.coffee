'use strict'

angular.module('newkruDlitApp')
  .directive('classroomCourseList', ($http, $route) ->
    templateUrl: 'views/pages/classroom-course-list.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.removeCourse = (code,image) ->
    		if(confirm("ต้องการจะลบใช่หรือไม่?"))
    			$http.delete('http://localhost/courses'+code).success ->
    				$route.reload()
    		return false
)
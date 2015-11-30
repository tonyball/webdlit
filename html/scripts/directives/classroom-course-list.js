(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('classroomCourseList', function($http, $route) {
    return {
      templateUrl: 'views/pages/classroom-course-list.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        return scope.removeCourse = function(code, image) {
          if (confirm("ต้องการจะลบใช่หรือไม่?")) {
            $http["delete"]('http://localhost/courses' + code).success(function() {
              return $route.reload();
            });
          }
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classroom-course-list.js.map
*/
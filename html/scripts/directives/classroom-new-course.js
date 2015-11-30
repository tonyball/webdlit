(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('classroomNewCourse', function($http, $location, randomString) {
    return {
      templateUrl: 'views/pages/classroom-new-course.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.addCourse = function(file) {
          var code_b, code_f;
          code_f = randomString(3);
          code_b = Math.floor((Math.random() * 9000) + 1000);
          $http.post('http://localhost/course/', scope.course).success(function(data) {
            return $location.path('/classroom/' + code);
          });
          return false;
        };
        return scope.hideCreateCourse = function() {
          angular.element('#new-course').slideUp();
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classroom-new-course.js.map
*/
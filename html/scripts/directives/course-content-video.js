(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseContentVideo', function($http, $rootScope) {
    return {
      templateUrl: 'views/pages/course-content-video.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        return scope.addActivity = function(content, course, coursecode, action) {
          var activity;
          if (scope.isAdded === false) {
            activity = {
              datetime: new Date(),
              activity: action + " เรื่อง" + content + " ของหลักสูตร" + course + " (" + coursecode + ")",
              type: "video"
            };
            $rootScope.current_user.activities.push(activity);
            $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {});
          }
          scope.isAdded = true;
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-content-video.js.map
*/
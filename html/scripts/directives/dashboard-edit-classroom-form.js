(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('dashboardEditClassroomForm', function() {
    return {
      templateUrl: 'views/pages/dashboard-edit-classroom-form.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.editClassroom = function(file, classroom) {
          if (file !== void 0) {
            classroom.image = file.name;
            $route.reload();
          }
          return false;
        };
        return scope.hideEditClassroom = function() {
          angular.element('.edit-classroom').slideUp();
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=dashboard-edit-classroom-form.js.map
*/
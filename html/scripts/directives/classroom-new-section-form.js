(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('classroomNewSectionForm', function() {
    return {
      templateUrl: 'views/pages/classroom-new-section-form.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.addSection = function() {
          scope.course_sections.push({
            name: "",
            contents: []
          });
          scope.i_section++;
          return false;
        };
        return scope.removeSection = function() {
          scope.course_sections.pop();
          scope.i_section--;
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classroom-new-section-form.js.map
*/
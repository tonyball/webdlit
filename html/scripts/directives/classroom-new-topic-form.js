(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('classroomNewTopicForm', function() {
    return {
      templateUrl: 'views/pages/classroom-new-topic-form.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.addTopic = function() {
          scope.course_topics.push("");
          scope.i_topic++;
          return false;
        };
        return scope.removeTopic = function() {
          scope.course_topics.pop();
          scope.i_topic--;
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classroom-new-topic-form.js.map
*/
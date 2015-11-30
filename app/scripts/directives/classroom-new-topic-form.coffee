'use strict'

angular.module('newkruDlitApp')
  .directive('classroomNewTopicForm', ->
    templateUrl: 'views/pages/classroom-new-topic-form.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.addTopic = ->
    		scope.course_topics.push("")
    		scope.i_topic++
    		return false
    	scope.removeTopic = ->
    		scope.course_topics.pop()
    		scope.i_topic--
    		return false
  )

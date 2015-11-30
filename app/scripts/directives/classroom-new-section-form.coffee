'use strict'

angular.module('newkruDlitApp')
  .directive('classroomNewSectionForm', ->
    templateUrl: 'views/pages/classroom-new-section-form.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.addSection = ->
    		scope.course_sections.push({name:"",contents:[]})
    		scope.i_section++
    		return false

    	scope.removeSection = ->
    		scope.course_sections.pop()
    		scope.i_section--
    		return false
  )

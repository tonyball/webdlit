'use strict'

angular.module('newkruDlitApp')
  .directive('dashboardEditClassroomForm', ->
    templateUrl: 'views/pages/dashboard-edit-classroom-form.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.editClassroom = (file, classroom) ->
    		if file != undefined
    			classroom.image = file.name
    			$route.reload()
    		return false
    	scope.hideEditClassroom = ->
    		angular.element('.edit-classroom').slideUp()
    		return false
  )

'use strict'

angular.module('newkruDlitApp')
  .directive('courseClipboard', ->
    templateUrl: 'views/pages/course-clipboard.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.undo = ->
            scope.version--
        scope.clear = ->
            angular.element('#SketchPad').trigger('click')
            return false
        scope.showClipboard = ->
            angular.element('#draw-clipboard-modal').show()
            return false
        scope.hideClipboard = ->
            angular.element('#draw-clipboard-modal').hide()
            return false
        scope.closeTextClipboard = ->
            angular.element('#text-clipboard-modal').closeModal()
            return false
        angular.element('#SketchPad').sketch()
        angular.element('.tooltipped').tooltip delay: 50
  )

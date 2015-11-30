'use strict'

angular.module('newkruDlitApp')
  .directive('profileAllBadgesModal', ->
    templateUrl: 'views/pages/profile-all-badges-modal.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	angular.element('.all-badges-container').hide()
  )

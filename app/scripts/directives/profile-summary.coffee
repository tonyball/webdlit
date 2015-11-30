'use strict'

angular.module('newkruDlitApp')
  .directive('profileSummary', ->
    templateUrl: 'views/pages/profile-summary.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.showAllBadges = ->
    		angular.element('#all-badges-modal').openModal()
    		return false

    	switchCard = (card) ->
	    	angular.element('.data-card').removeClass 'fadeIn'
	    	angular.element('.data-card').addClass('fadeOut').hide()
	    	angular.element(card).removeClass 'fadeOut'
	    	angular.element(card).addClass('fadeIn').show()
    		return false

    	angular.element('.action-btn').on 'click', ->
	    	angular.element('.action-btn').addClass 'black-text btn-flat'
	    	angular.element('.action-btn').removeClass 'white-text btn orange'
	    	angular.element(this).removeClass 'black-text btn-flat'
	    	angular.element(this).addClass 'white-text btn orange'
	    	switchCard '.' + angular.element(this).attr('data-value')
	    	return false
	    angular.element('select').on 'change', ->
	    	switchCard '.' + angular.element(this).val()
	    	return false
  )

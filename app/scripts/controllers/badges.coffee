'use strict'

angular.module('newkruDlitApp')
  .controller 'BadgesCtrl', ($scope, $http, $rootScope) ->
  	$rootScope.title = 'เหรียญ'
  	$scope.earths = []
  	$scope.moons = []
  	$scope.blackholes = []
  	$scope.suns = []
  	$scope.meteorites = []

  	$http({
  		method: 'GET',
  		url: 'http://localhost/badges'
  	}).success (badges_data) ->
  		$scope.badges = badges_data
  		for bd in badges_data
  			if bd.group == 'earth'
  				$scope.earths.push bd
  			else if bd.group == 'moon'
  				$scope.moons.push bd
  			else if bd.group == 'blackhole'
  				$scope.blackholes.push bd
  			else if bd.group == 'sun'
  				$scope.suns.push bd
  			else if bd.group == 'meteorite'
  				$scope.meteorites.push bd
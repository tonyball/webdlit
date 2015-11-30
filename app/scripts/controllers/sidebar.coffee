'use strict'

angular.module('newkruDlitApp')
  .controller 'SidebarCtrl', ($scope, $location) ->
    $scope.isActive = (viewLocation) ->
   		location = $location.path().split '/'
   		viewLocation == "/"+location[1]

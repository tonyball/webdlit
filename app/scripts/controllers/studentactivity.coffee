'use strict'

angular.module('newkruDlitApp')
  .controller 'StudentactivityCtrl', ($scope, $rootScope, $http, $routeParams) ->
    $rootScope.title = "งานนักเรียน"
    $scope.classes = []
    $scope.current_class_index = '0'
    for classroom in $rootScope.current_user.classrooms
      $http.get('http://localhost/classrooms/'+classroom).success (classroom_data) ->
        classroom_data.course_details = []
        for uc in classroom_data.courses
          $http.get('http://localhost/courses/'+uc).success (course_data) ->
            course_data.std_details = []
            for std in course_data.students
              $http.get('http://localhost/users/'+std).success (std_data) ->
                course_data.std_details.push std_data
            classroom_data.course_details.push course_data
        $scope.classes.push classroom_data

    showContent = (id) ->
      angular.element('.classroom-content').hide()
      angular.element('#' + id).show()
      return false

    if $routeParams != undefined
      showContent($routeParams.classcode)
    else
      angular.element('.classroom-content').hide()
      angular.element('#'+angular.element('select').val()).show()

    angular.element('.btn-flat').on 'click', ->
      angular.element('.btn-flat').removeClass 'active'
      angular.element(this).addClass 'active'
      filterContent '.' + angular.element(this).attr('data-value')
      return false

    angular.element('.course-selector').on 'change', ->
      showContent(angular.element(this).val())
      return false

    filterContent = (subject) ->
      angular.element('.content').hide()
      angular.element(subject).show()
      return false

    $scope.showContent = ->
      angular.element('.collapsible').collapsible accordion: false
      return false

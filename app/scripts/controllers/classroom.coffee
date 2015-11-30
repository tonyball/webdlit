'use strict'

angular.module('newkruDlitApp')
  .controller 'ClassroomCtrl', ($scope, $route, $rootScope, $routeParams, $http,Pagination,$location, $sce) ->
    $rootScope.title = "ห้องเรียน"
    $scope.user_classrooms = []
    $scope.course_topics = []
    $scope.course_sections = []
    $scope.score_list = []
    $scope.test = $location.search().test

    $scope.showCreateCourse = ->
      $scope.course_title = ''
      $scope.course_image = ''
      $scope.course_teacher_name = ''
      $scope.course_subject = ''
      angular.element('#new-course').show()
      return false

    $scope.addPost = ->
      post = {content:$scope.new_post,datetime:new Date()}
      $scope.classroom.posts.push post
      $http.put('http://localhost/classrooms/'+$scope.classroom.code,$scope.classroom).success ->
        $route.reload()
      return false
    $scope.deletePost = (post) ->
      if confirm('คุณแน่ใจว่าต้องการจะลบโพสต์?')
        $scope.classroom.posts.splice($scope.classroom.posts.indexOf(post),1)
        $http.put('http://localhost/classrooms/'+$scope.classroom.code,$scope.classroom).success ->
          $route.reload()
      return false

    $scope.showScoreList = (id) ->
      angular.element('#grading-modal-'+id).openModal()
      return false

    $scope.editorOptions = {language: 'th', uiColor: '#ffffff', height:'150'}

    $http.get('http://localhost/classrooms/'+$routeParams.classcode).success (classroom_data) ->
      $scope.classroom = classroom_data
      $scope.classroom.course_detail = []
      $rootScope.title = 'ห้องเรียน'+$scope.classroom.title

      for course in $scope.classroom.courses
        $http.get('http://localhost/courses/'+course).success (course_data) ->
          course_data.scores = []
          $http.get('http://localhost/scores').success (score_data) ->
            for sd in score_data
              if sd.course_code == course_data.code
                course_data.scores.push sd
          $scope.classroom.course_detail.push course_data

    angular.element('.tooltipped').tooltip({delay: 50})
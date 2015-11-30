(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('ClassroomCtrl', function($scope, $route, $rootScope, $routeParams, $http, Pagination, $location, $sce) {
    $rootScope.title = "ห้องเรียน";
    $scope.user_classrooms = [];
    $scope.course_topics = [];
    $scope.course_sections = [];
    $scope.score_list = [];
    $scope.test = $location.search().test;
    $scope.showCreateCourse = function() {
      $scope.course_title = '';
      $scope.course_image = '';
      $scope.course_teacher_name = '';
      $scope.course_subject = '';
      angular.element('#new-course').show();
      return false;
    };
    $scope.addPost = function() {
      var post;
      post = {
        content: $scope.new_post,
        datetime: new Date()
      };
      $scope.classroom.posts.push(post);
      $http.put('http://localhost/classrooms/' + $scope.classroom.code, $scope.classroom).success(function() {
        return $route.reload();
      });
      return false;
    };
    $scope.deletePost = function(post) {
      if (confirm('คุณแน่ใจว่าต้องการจะลบโพสต์?')) {
        $scope.classroom.posts.splice($scope.classroom.posts.indexOf(post), 1);
        $http.put('http://localhost/classrooms/' + $scope.classroom.code, $scope.classroom).success(function() {
          return $route.reload();
        });
      }
      return false;
    };
    $scope.showScoreList = function(id) {
      angular.element('#grading-modal-' + id).openModal();
      return false;
    };
    $scope.editorOptions = {
      language: 'th',
      uiColor: '#ffffff',
      height: '150'
    };
    $http.get('http://localhost/classrooms/' + $routeParams.classcode).success(function(classroom_data) {
      var course, _i, _len, _ref, _results;
      $scope.classroom = classroom_data;
      $scope.classroom.course_detail = [];
      $rootScope.title = 'ห้องเรียน' + $scope.classroom.title;
      _ref = $scope.classroom.courses;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        course = _ref[_i];
        _results.push($http.get('http://localhost/courses/' + course).success(function(course_data) {
          course_data.scores = [];
          $http.get('http://localhost/scores').success(function(score_data) {
            var sd, _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = score_data.length; _j < _len1; _j++) {
              sd = score_data[_j];
              if (sd.course_code === course_data.code) {
                _results1.push(course_data.scores.push(sd));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          });
          return $scope.classroom.course_detail.push(course_data);
        }));
      }
      return _results;
    });
    return angular.element('.tooltipped').tooltip({
      delay: 50
    });
  });

}).call(this);

/*
//@ sourceMappingURL=classroom.js.map
*/
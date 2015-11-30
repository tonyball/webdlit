(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('StudentactivityCtrl', function($scope, $rootScope, $http, $routeParams) {
    var classroom, filterContent, showContent, _i, _len, _ref;
    $rootScope.title = "งานนักเรียน";
    $scope.classes = [];
    $scope.current_class_index = '0';
    _ref = $rootScope.current_user.classrooms;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      classroom = _ref[_i];
      $http.get('http://localhost/classrooms/' + classroom).success(function(classroom_data) {
        var uc, _j, _len1, _ref1;
        classroom_data.course_details = [];
        _ref1 = classroom_data.courses;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          uc = _ref1[_j];
          $http.get('http://localhost/courses/' + uc).success(function(course_data) {
            var std, _k, _len2, _ref2;
            course_data.std_details = [];
            _ref2 = course_data.students;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              std = _ref2[_k];
              $http.get('http://localhost/users/' + std).success(function(std_data) {
                return course_data.std_details.push(std_data);
              });
            }
            return classroom_data.course_details.push(course_data);
          });
        }
        return $scope.classes.push(classroom_data);
      });
    }
    showContent = function(id) {
      angular.element('.classroom-content').hide();
      angular.element('#' + id).show();
      return false;
    };
    if ($routeParams !== void 0) {
      showContent($routeParams.classcode);
    } else {
      angular.element('.classroom-content').hide();
      angular.element('#' + angular.element('select').val()).show();
    }
    angular.element('.btn-flat').on('click', function() {
      angular.element('.btn-flat').removeClass('active');
      angular.element(this).addClass('active');
      filterContent('.' + angular.element(this).attr('data-value'));
      return false;
    });
    angular.element('.course-selector').on('change', function() {
      showContent(angular.element(this).val());
      return false;
    });
    filterContent = function(subject) {
      angular.element('.content').hide();
      angular.element(subject).show();
      return false;
    };
    return $scope.showContent = function() {
      angular.element('.collapsible').collapsible({
        accordion: false
      });
      return false;
    };
  });

}).call(this);

/*
//@ sourceMappingURL=studentactivity.js.map
*/
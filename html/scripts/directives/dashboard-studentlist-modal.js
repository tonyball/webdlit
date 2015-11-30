(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('dashboardStudentlistModal', function($http, $route) {
    return {
      templateUrl: 'views/pages/dashboard-studentlist-modal.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.removeStudent = function(classroom, username) {
          var del_idx;
          if (confirm("ต้องการจะลบใช่หรือไม่?")) {
            del_idx = classroom.students.indexOf(username);
            classroom.students.splice(del_idx, 1);
            $http.put('http://localhost/classrooms/' + classroom.code, classroom);
            $http.get('http://localhost/users/' + username).success(function(user_data) {
              var del_class_idx;
              del_class_idx = user_data.classrooms.indexOf(classroom.code);
              user_data.classrooms.splice(del_class_idx, 1);
              return $http.put('http://localhost/users/' + username, user_data).success(function() {
                $route.reload();
                return window.location.reload();
              });
            });
          }
          return false;
        };
        return scope.addStudent = function(classroom, new_std_username) {
          $http.get('http://localhost/users/' + new_std_username).success(function(user_data) {
            scope.std = user_data;
            if (classroom.students.indexOf(new_std_username) === -1) {
              scope.std.classrooms.push(classroom.code);
              classroom.students.push(new_std_username);
              $http.put('http://localhost/classrooms/' + classroom.code, classroom);
              return $http.put('http://localhost/users/' + new_std_username, scope.std).success(function() {
                return alert('เพิ่มนักเรียนเรียบร้อยแล้ว');
              });
            }
          });
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=dashboard-studentlist-modal.js.map
*/
(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('dashboardClassroomList', function($http, $route, $rootScope) {
    return {
      templateUrl: 'views/pages/dashboard-classroom-list.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.removeClassroom = function(code, image) {
          var del_idx;
          if (confirm("ต้องการจะลบใช่หรือไม่?")) {
            del_idx = $rootScope.current_user.classrooms.indexOf(code);
            $rootScope.current_user.classrooms.splice(del_idx, 1);
            $http["delete"]('http://localhost/classrooms/' + code).success(function() {
              return $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {
                return $route.reload();
              });
            });
          }
          return false;
        };
        scope.showStdList = function(id) {
          angular.element('#studentlist-modal-' + id).openModal();
          return false;
        };
        return scope.showEditClassroom = function(classroom) {
          angular.element('#edit-classroom-' + classroom.code).removeClass('fadeOutUp').show();
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=dashboard-classroom-list.js.map
*/
(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('dashboardNewClassroomForm', function($http, $location, randomString, $rootScope) {
    return {
      templateUrl: 'views/pages/dashboard-new-classroom-form.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.addClassroom = function(file) {
          var code_b, code_f, head, splited, tail, verfcode_b, verfcode_f;
          code_f = randomString(3);
          code_b = Math.floor((Math.random() * 9000) + 1000);
          verfcode_f = randomString(6);
          verfcode_b = Math.floor((Math.random() * 900000) + 100000);
          scope.classroom_data.code = code_f + '' + code_b;
          scope.classroom_data.verification_code = verfcode_f + '' + verfcode_b;
          splited = scope.class_image.name.split('.');
          head = splited[0] + '' + Date.now();
          tail = splited[1];
          scope.classroom_data.image = head + '.' + tail;
          $rootScope.current_user.classrooms.push(scope.classroom_data.code);
          $http({
            method: 'POST',
            url: 'http://localhost/saveImage',
            data: {
              file: file,
              name: scope.classroom_data.image
            }
          });
          $http.post('http://localhost/classrooms/', scope.classroom_data).success(function(data) {
            return $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {
              return $location.path('/classroom/' + data.code);
            });
          });
          return false;
        };
        return scope.hideCreateClassroom = function() {
          angular.element('#new-classroom').slideUp();
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=dashboard-new-classroom-form.js.map
*/
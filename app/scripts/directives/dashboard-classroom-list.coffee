'use strict'

angular.module('newkruDlitApp')
  .directive('dashboardClassroomList', ($http, $route, $rootScope) ->
    templateUrl: 'views/pages/dashboard-classroom-list.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.removeClassroom = (code,image) ->
            if(confirm("ต้องการจะลบใช่หรือไม่?"))
                del_idx = $rootScope.current_user.classrooms.indexOf(code)
                $rootScope.current_user.classrooms.splice(del_idx,1)
                $http.delete('http://localhost/classrooms/'+code).success ->
                    $http.put('http://localhost/users/'+$rootScope.current_user.username, $rootScope.current_user).success ->
                        $route.reload()
            return false
        scope.showStdList = (id) ->
            angular.element('#studentlist-modal-'+id).openModal()
            return false
        scope.showEditClassroom = (classroom) ->
            angular.element('#edit-classroom-'+classroom.code).removeClass('fadeOutUp').show()
            return false
  )

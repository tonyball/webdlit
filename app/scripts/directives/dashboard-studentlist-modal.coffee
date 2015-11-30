'use strict'

angular.module('newkruDlitApp')
  .directive('dashboardStudentlistModal', ($http,$route)->
    templateUrl: 'views/pages/dashboard-studentlist-modal.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.removeStudent = (classroom, username) ->
            if(confirm("ต้องการจะลบใช่หรือไม่?"))
                del_idx = classroom.students.indexOf(username)
                classroom.students.splice(del_idx,1)
                $http.put('http://localhost/classrooms/'+classroom.code, classroom)
                $http.get('http://localhost/users/'+username).success (user_data) ->
                    del_class_idx = user_data.classrooms.indexOf(classroom.code)
                    user_data.classrooms.splice(del_class_idx,1)
                    $http.put('http://localhost/users/'+username, user_data).success ->
                        $route.reload()
                        window.location.reload()
            return false
        scope.addStudent = (classroom,new_std_username) ->
            $http.get('http://localhost/users/'+new_std_username).success (user_data) ->
                scope.std = user_data
                if classroom.students.indexOf(new_std_username) == -1
                    scope.std.classrooms.push classroom.code
                    classroom.students.push new_std_username
                    $http.put('http://localhost/classrooms/'+classroom.code, classroom)
                    $http.put('http://localhost/users/'+new_std_username, scope.std).success ->
                        alert 'เพิ่มนักเรียนเรียบร้อยแล้ว'
            return false
  )

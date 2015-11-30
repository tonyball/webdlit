'use strict'

angular.module('newkruDlitApp')
  .directive('courseContentTest', ($http,$rootScope,$location,$filter,$cookies) ->
    templateUrl: 'views/pages/course-content-test.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.submitAnswer = ->
            scope.current_score = 0
            scope.score_percentage = 0
            if scope.submit_answer.length-1 == scope.tests[0].number_of_question[scope.test_number-1]
                n = 0
                while n <= scope.tests[0].number_of_question[scope.test_number-1]
                    if parseInt(scope.submit_answer[n+1]) == parseInt(scope.tests[0].answer_of_question[scope.test_number-1][n])
                        scope.current_score++
                    n++
                angular.element('.answer-set').children().attr('disabled',true)
                angular.element('.submit-btn').addClass('hide-card').removeClass('show-body')
                angular.element('#score-modal').openModal()
                scope.score_percentage = (scope.current_score/scope.tests[0].number_of_question[scope.test_number-1])*100
                scope.sent = true
                scope.clock.stop()
            else
                alert 'กรุณาตอบให้ครบทุกข้อ'
            return false

        scope.addTestActivity = (content, course, coursecode, action) ->
            for ts in scope.classroom.tested_students
                    if ts == $rootScope.current_user.username
                        scope.isAdded = true
                        break

            scope.day_number = parseInt($filter('date')(scope.today, 'd'))
            if scope.chart == undefined
                aChart = {username:$cookies.get('current_user'),month:$filter('date')(scope.today,'MMMM'),title:scope.classroom.title,code:scope.classroom.code,times:[],scores:[]}
                i = 0
                while i <= 30
                    aChart.times.push 0
                    aChart.scores.push {name:'',score:0}
                    i++
                aChart.scores[scope.day_number-1] = {name:content,score:scope.current_score}
                $http.post('http://localhost/chartusers',aChart).success (data) ->
                    scope.chart = data
            else if scope.chart != undefined
                scope.chart.scores[scope.day_number-1] = {name:content,score:scope.current_score}
                $http.put('http://localhost/chartusers/'+scope.chart._id, scope.chart).success (data) ->
                    scope.chart = data

            if scope.isAdded == false
                score = {score_id:Math.floor((Math.random()*90000)+10000),username:$rootScope.current_user.username, test_name:content,course_code:coursecode,teacher_comment:"ยังไม่มีความเห็น", status:'submitted',score:scope.current_score,full_score:scope.tests[0].number_of_question[scope.test_number-1],score_percentage:scope.score_percentage,submit_answer:scope.submit_answer,correct_answer:scope.tests[0].answer_of_question[scope.test_number-1]}
                $rootScope.current_user.scores.push score.score_id
                activity = {datetime: new Date(), activity: action+" เรื่อง"+content+" ของหลักสูตร"+course+" ("+coursecode+")",type:"score",course_code:coursecode,score_id:score.score_id}
                $rootScope.current_user.activities.push activity
                $http.post('http://localhost/scores',score).success (data) ->
                    $http.put('http://localhost/users/'+$rootScope.current_user.username, $rootScope.current_user).success ->
                        scope.isAdded = true
                    scope.classroom.tested_students.push {username:$rootScope.current_user.username, score_id:data.score_id}
                    $http.put('http://localhost/courses/'+coursecode, scope.classroom).success ->
                        window.location.reload()
            return false
  )

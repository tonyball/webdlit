'use strict'

angular.module('newkruDlitApp')
  .directive('courseContentAction', ($http, $rootScope) ->
    templateUrl: 'views/pages/course-content-action.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.showSlide = ->
            scope.data = !scope.data
            return false
        scope.checkAnswer = ->
            scope.correct_point = 0
            scope.incorrect_point = 0
            for type in ['tfq','multiple','tfqx','text','multitext']
                for q in scope.questions[type]
                    if q.id == scope.current_content
                        scope.current_question = q
                        break
            noq = 1
            for ans in scope.current_question.answer_of_question
                if typeof scope.check_answers[noq] == "object"
                    ans_for_check = ''
                    user_ans = $.map(scope.check_answers[noq], (ua) -> ua)
                    for ua in user_ans
                        ans_for_check += ua.toString().replace(/\s/g,'')
                    ans_for_check = ans_for_check.trim()
                else if scope.check_answers[noq] != undefined
                    ans_for_check = scope.check_answers[noq].toString().replace(/\s/g,'')
                else if scope.check_answers[noq] == undefined
                    ans_for_check = ''
                if scope.current_question.answer_type == 'text' || scope.current_question.answer_type == 'multitext'
                  corrected = 0
                  all_correct_ans = ''
                  for a in ans.correct_answers
                    if ans_for_check == a.toString().replace(/\s/g,'')
                      corrected++
                    else
                      all_correct_ans += a
                  if corrected == ans.number_of_answer
                    angular.element('#label-question-'+scope.current_content+'-'+noq).html("<b class='green-text'> ถูกต้อง </b>")
                    angular.element('#question-'+scope.current_content+'-'+noq).removeClass('invalid').addClass('valid')
                    scope.correct_point++
                  else
                    angular.element('#label-question-'+scope.current_content+'-'+noq).html("<b class='red-text'> ไม่ถูกต้อง ➱ "+all_correct_ans+"</b>")
                    angular.element('#question-'+scope.current_content+'-'+noq).removeClass('valid').addClass('invalid')
                    scope.incorrect_point++
                else
                  if ans_for_check == ans.toString().replace(/\s/g,'')
                      angular.element('#label-question-'+scope.current_content+'-'+noq).html("<b class='green-text'> ถูกต้อง </b>")
                      angular.element('#question-'+scope.current_content+'-'+noq).removeClass('invalid').addClass('valid')
                      scope.correct_point++
                  else
                      angular.element('#label-question-'+scope.current_content+'-'+noq).html("<b class='red-text'> ไม่ถูกต้อง ➱ "+ans+"</b>")
                      angular.element('#question-'+scope.current_content+'-'+noq).removeClass('valid').addClass('invalid')
                      scope.incorrect_point++
                noq++
            return false
        scope.addPracticeActivity = (content, course, coursecode, action) ->
            if scope.isAdded == false
                content.submit_answer = scope.check_answers
                delete content.started
                delete content.complete
                delete content.not_start
                activity = {datetime: new Date(), activity: action+" เรื่อง"+content.title+" ของหลักสูตร"+course+" ("+coursecode+")",content:content,type:"practice"}
                $rootScope.current_user.activities.push activity
                $http.put('http://localhost/users/'+$rootScope.current_user.username, $rootScope.current_user).success ->
                    scope.isAdded = true
                return false
  )

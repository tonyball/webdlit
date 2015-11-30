(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseContentAction', function($http, $rootScope) {
    return {
      templateUrl: 'views/pages/course-content-action.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.showSlide = function() {
          scope.data = !scope.data;
          return false;
        };
        scope.checkAnswer = function() {
          var ans, ans_for_check, noq, q, type, ua, user_ans, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
          scope.correct_point = 0;
          scope.incorrect_point = 0;
          _ref = ['tfq', 'multiple', 'tfqx', 'text', 'multitext'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            type = _ref[_i];
            _ref1 = scope.questions[type];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              q = _ref1[_j];
              if (q.id === scope.current_content) {
                scope.current_question = q;
                break;
              }
            }
          }
          noq = 1;
          _ref2 = scope.current_question.answer_of_question;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            ans = _ref2[_k];
            if (typeof scope.check_answers[noq] === "object") {
              ans_for_check = '';
              user_ans = $.map(scope.check_answers[noq], function(ua) {
                return ua;
              });
              for (_l = 0, _len3 = user_ans.length; _l < _len3; _l++) {
                ua = user_ans[_l];
                ans_for_check += ua.toString().replace(/\s/g, '');
              }
              ans_for_check = ans_for_check.trim();
            } else if (scope.check_answers[noq] !== void 0) {
              ans_for_check = scope.check_answers[noq].toString().replace(/\s/g, '');
            } else if (scope.check_answers[noq] === void 0) {
              ans_for_check = '';
            }
            if (ans_for_check === ans.toString().replace(/\s/g, '')) {
              angular.element('#label-question-' + scope.current_content + '-' + noq).html("<b class='green-text'> ถูกต้อง </b>");
              angular.element('#question-' + scope.current_content + '-' + noq).removeClass('invalid').addClass('valid');
              scope.correct_point++;
            } else {
              angular.element('#label-question-' + scope.current_content + '-' + noq).html("<b class='red-text'> ไม่ถูกต้อง ➱ " + ans + "</b>");
              angular.element('#question-' + scope.current_content + '-' + noq).removeClass('valid').addClass('invalid');
              scope.incorrect_point++;
            }
            noq++;
          }
          return false;
        };
        return scope.addPracticeActivity = function(content, course, coursecode, action) {
          var activity;
          if (scope.isAdded === false) {
            content.submit_answer = scope.check_answers;
            delete content.started;
            delete content.complete;
            delete content.not_start;
            activity = {
              datetime: new Date(),
              activity: action + " เรื่อง" + content.title + " ของหลักสูตร" + course + " (" + coursecode + ")",
              content: content,
              type: "practice"
            };
            $rootScope.current_user.activities.push(activity);
            $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {
              return scope.isAdded = true;
            });
            return false;
          }
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-content-action.js.map
*/
(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseContentTest', function($http, $rootScope, $location, $filter, $cookies) {
    return {
      templateUrl: 'views/pages/course-content-test.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.submitAnswer = function() {
          var n;
          scope.current_score = 0;
          scope.score_percentage = 0;
          if (scope.submit_answer.length - 1 === scope.tests[0].number_of_question[scope.test_number - 1]) {
            n = 0;
            while (n <= scope.tests[0].number_of_question[scope.test_number - 1]) {
              if (parseInt(scope.submit_answer[n + 1]) === parseInt(scope.tests[0].answer_of_question[scope.test_number - 1][n])) {
                scope.current_score++;
              }
              n++;
            }
            angular.element('.answer-set').children().attr('disabled', true);
            angular.element('.submit-btn').addClass('hide-card').removeClass('show-body');
            angular.element('#score-modal').openModal();
            scope.score_percentage = (scope.current_score / scope.tests[0].number_of_question[scope.test_number - 1]) * 100;
            scope.sent = true;
            scope.clock.stop();
          } else {
            alert('กรุณาตอบให้ครบทุกข้อ');
          }
          return false;
        };
        return scope.addTestActivity = function(content, course, coursecode, action) {
          var aChart, activity, i, score, ts, _i, _len, _ref;
          _ref = scope.classroom.tested_students;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ts = _ref[_i];
            if (ts === $rootScope.current_user.username) {
              scope.isAdded = true;
              break;
            }
          }
          scope.day_number = parseInt($filter('date')(scope.today, 'd'));
          if (scope.chart === void 0) {
            aChart = {
              username: $cookies.get('current_user'),
              month: $filter('date')(scope.today, 'MMMM'),
              title: scope.classroom.title,
              code: scope.classroom.code,
              times: [],
              scores: []
            };
            i = 0;
            while (i <= 30) {
              aChart.times.push(0);
              aChart.scores.push({
                name: '',
                score: 0
              });
              i++;
            }
            aChart.scores[scope.day_number - 1] = {
              name: content,
              score: scope.current_score
            };
            $http.post('http://localhost/chartusers', aChart).success(function(data) {
              return scope.chart = data;
            });
          } else if (scope.chart !== void 0) {
            scope.chart.scores[scope.day_number - 1] = {
              name: content,
              score: scope.current_score
            };
            $http.put('http://localhost/chartusers/' + scope.chart._id, scope.chart).success(function(data) {
              return scope.chart = data;
            });
          }
          if (scope.isAdded === false) {
            score = {
              score_id: Math.floor((Math.random() * 90000) + 10000),
              username: $rootScope.current_user.username,
              test_name: content,
              course_code: coursecode,
              teacher_comment: "ยังไม่มีความเห็น",
              status: 'submitted',
              score: scope.current_score,
              full_score: scope.tests[0].number_of_question[scope.test_number - 1],
              score_percentage: scope.score_percentage,
              submit_answer: scope.submit_answer,
              correct_answer: scope.tests[0].answer_of_question[scope.test_number - 1]
            };
            $rootScope.current_user.scores.push(score.score_id);
            activity = {
              datetime: new Date(),
              activity: action + " เรื่อง" + content + " ของหลักสูตร" + course + " (" + coursecode + ")",
              type: "score",
              course_code: coursecode,
              score_id: score.score_id
            };
            $rootScope.current_user.activities.push(activity);
            $http.post('http://localhost/scores', score).success(function(data) {
              $http.put('http://localhost/users/' + $rootScope.current_user.username, $rootScope.current_user).success(function() {
                return scope.isAdded = true;
              });
              scope.classroom.tested_students.push({
                username: $rootScope.current_user.username,
                score_id: data.score_id
              });
              return $http.put('http://localhost/courses/' + coursecode, scope.classroom).success(function() {
                return window.location.reload();
              });
            });
          }
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-content-test.js.map
*/
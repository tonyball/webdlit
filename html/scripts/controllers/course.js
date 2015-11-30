(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('CourseCtrl', function($scope, $rootScope, $routeParams, $http, Pagination, $location, $interval, $cookies, $filter) {
    var setAnswer, showContentById;
    $scope.classroom = {};
    $rootScope.title = "หลักสูตร​ ";
    $scope.rendered = '';
    $scope.playing = false;
    $scope.timestop = false;
    $scope.isAdded = false;
    $scope.seconds = 0;
    $scope.minutes = 0;
    $scope.current_object = {};
    $scope.frameWidth = window.innerWidth;
    $scope.today = new Date();
    $scope.check_answers = [];
    $scope.submit_answer = [];
    $scope.contents = [];
    $scope.questions = {
      tfq: [],
      text: [],
      multiple: [],
      tfqx: [],
      multitext: [],
      ordering: [],
      matching: [],
      drapdrop: []
    };
    $scope.tests = [];
    $scope.current_content = '';
    $scope.test_number = 4;
    $scope.sent = false;
    $scope.data = false;
    $scope.selectedColor = '#000000';
    angular.element('.modal-trigger').leanModal();
    angular.element('.tooltipped').tooltip({
      delay: 50
    });
    $http.get('http://localhost/chartusers').success(function(chart_data) {
      var chart, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = chart_data.length; _i < _len; _i++) {
        chart = chart_data[_i];
        if (chart.username === $cookies.get('current_user')) {
          if (chart.month === $filter('date')($scope.today, 'MMMM')) {
            $scope.chart = chart;
            break;
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
    showContentById = function(content_id) {
      var cont, _i, _len, _ref;
      $scope.check_answers = [];
      $scope.submit_answer = [];
      $scope.current_content = content_id;
      _ref = $scope.contents;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cont = _ref[_i];
        if (cont.id === $scope.current_content) {
          $scope.content = cont;
          break;
        }
      }
      $scope.current_section = $scope.content.section_name;
      $scope.switchContent('.' + $scope.content.type + '-container', $scope.content.type, $routeParams.coursecode + '/' + $scope.content.section_name + '/' + $scope.content.content_url, $scope.content.title, $scope.content.id);
      return false;
    };
    setAnswer = function() {
      var i, _results;
      $scope.tests[0].answer_box = [];
      i = 1;
      _results = [];
      while (i <= $scope.tests[0].number_of_question[$scope.test_number - 1]) {
        $scope.tests[0].answer_box.push(i);
        _results.push(i++);
      }
      return _results;
    };
    $scope.timing = function(event) {
      if ($scope.playing === false) {
        event.target.play();
        $scope.playing = true;
        $scope.startTime();
      } else if ($scope.playing === true) {
        event.target.pause();
        $scope.playing = false;
        $scope.stopTime();
      }
      return false;
    };
    $scope.startTime = function() {
      $scope.promise = $interval($scope.plusTime, 1000);
      return false;
    };
    $scope.plusTime = function() {
      var aChart, i;
      $scope.day_number = parseInt($filter('date')($scope.today, 'd'));
      if ($scope.seconds === 60) {
        $scope.minutes++;
        $scope.seconds = 0;
        if ($scope.chart === void 0) {
          aChart = {
            username: $cookies.get('current_user'),
            month: $filter('date')($scope.today, 'MMMM'),
            title: $scope.classroom.title,
            code: $scope.classroom.code,
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
          aChart.times[$scope.day_number - 1] += $scope.minutes;
          $http.post('http://localhost/chartusers', aChart).success(function(data) {
            return $scope.chart = data;
          });
        } else if ($scope.chart !== void 0) {
          $scope.chart.times[$scope.day_number - 1] += $scope.minutes;
          $http.put('http://localhost/chartusers/' + $scope.chart._id, $scope.chart).success(function(data) {
            return $scope.chart = data;
          });
        }
      } else {
        $scope.seconds++;
      }
      return false;
    };
    $scope.stopTime = function() {
      angular.element('#video-item').get(0).pause();
      $scope.playing = false;
      $interval.cancel($scope.promise);
      return false;
    };
    $scope.showDetailedAnswer = function() {
      var answer_file, splited;
      splited = $scope.file_name.split('.');
      answer_file = splited[0] + '-Key.pdf';
      angular.element('#test-item').attr('data', 'contents/' + answer_file);
      angular.element('.content-title').text('เฉลยแบบทดสอบ ');
      return false;
    };
    $scope.openAnswerSheet = function(event) {
      angular.element(event.target).hide();
      angular.element('.answer-test-container,.answer-container,.answer-container-action,#open-classroom-sidenav').fadeIn();
      angular.element('.classroom-sidenav-container,.questions').hide();
      angular.element('#question-' + $scope.content.id).fadeIn();
      angular.element('#practice-item-pdf,#test-item,#practice-item-img').addClass('m9 s12');
      angular.element('.answer-container').addClass('s12 m3');
      angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12');
      if (angular.element(event.target).attr('id') === 'open-test-answer-sheet') {
        $scope.clock.start();
        angular.element('.answer-container-action').hide();
      }
      return false;
    };
    $scope.openClassroomSidenav = function(event) {
      angular.element(event.target).hide();
      angular.element('.answer-test-container,.answer-container,.answer-container-action').hide();
      angular.element('.classroom-sidenav-container,#open-test-answer-sheet,#open-practice-answer-sheet').fadeIn();
      angular.element('#practice-item-pdf,#test-item,#practice-item-img').removeClass('m9 s12');
      angular.element('.main-content-container').removeClass('m12 s12').addClass('m9 s12');
      if ($scope.content.type === 'video') {
        angular.element('#open-practice-answer-sheet,#open-test-answer-sheet').hide();
      }
      if ($scope.test_number !== 0) {
        angular.element('#open-practice-answer-sheet').hide();
      } else {
        angular.element('#open-test-answer-sheet').hide();
      }
      return false;
    };
    $scope.switchContent = function(content, type, url, title, content_id) {
      var splited;
      $scope.isAdded = false;
      angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12');
      angular.element('.content-container, .action-container,.classroom-sidenav-container').hide();
      angular.element(content + ',' + content + '-action, #open-classroom-sidenav').fadeIn();
      angular.element('.content-title').text(title);
      if (type === 'video') {
        angular.element('.open-answer-sheet-btn,.answer-container,.answer-container-action').hide();
        $scope.test_number = 0;
        angular.element('.content-title').fadeIn();
        angular.element('#video-item').attr('src', 'videos/' + url);
      } else if (type === 'practice') {
        $scope.test_number = 0;
        angular.element('.open-answer-sheet-btn,.questions,.answer-container,.answer-container-action').hide();
        angular.element('#open-practice-answer-sheet').fadeIn();
        if (url.split('.')[1] === 'pdf') {
          angular.element('#practice-item-pdf').fadeIn().attr('data', 'contents/' + url);
          angular.element('#practice-item-img').hide();
        } else {
          angular.element('#practice-item-img').fadeIn().attr('src', 'contents/' + url);
          angular.element('#practice-item-pdf').hide();
        }
      } else if (type === 'test') {
        angular.element('.answer-test-container,.open-answer-sheet-btn,.answer-container-action,#open-practice-answer-sheet').hide();
        angular.element('#open-test-answer-sheet,.content-title').fadeIn();
        angular.element('.ans-result').text('');
        angular.element('.answer-set').children().attr('disabled', false);
        angular.element('input[type="radio"]').attr('checked', false);
        angular.element('input[type="radio"]+label').removeClass('correct');
        angular.element('input[type="radio"]:checked+label').removeClass('correct, incorrect');
        $scope.test_number = 4;
        splited = url.split('.');
        $scope.file_name = splited[0] + '-' + $scope.test_number + '.' + splited[1];
        setAnswer();
        angular.element('#test-item').attr('data', 'contents/' + $scope.file_name);
        angular.element('.submit-btn').addClass('show-body').removeClass('hide-card');
        $scope.sent = false;
        $scope.clock = angular.element('.exam-clock').FlipClock({
          autoStart: false,
          clockFace: 'MinuteCounter'
        });
        $scope.clock.setTime($scope.tests[0].time[$scope.test_number - 1] * 60);
        $scope.clock.setCountdown(true);
      }
      return false;
    };
    $scope.hidePanel = function() {
      angular.element('#special-input-panel').hide();
      return false;
    };
    return $http.get('http://localhost/courses/' + $routeParams.coursecode).success(function(course_data) {
      var content, count, i, notify, q, s, section, student, ts, type, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      $scope.classroom = course_data;
      $rootScope.title = "หลักสูตร​ " + $scope.classroom.title;
      $scope.isTested = false;
      $http.get('http://localhost/classrooms/' + $scope.classroom.classroom).success(function(classroom_data) {
        return $scope.classroom.students = classroom_data.students;
      });
      count = 0;
      _ref = $scope.classroom.tested_students;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ts = _ref[_i];
        if ($scope.classroom.students.indexOf(ts.username) !== -1) {
          count++;
        }
      }
      if (count === $scope.classroom.students.length) {
        if ($scope.classroom.sentNotifyTest === false) {
          _ref1 = $scope.classroom.tested_students;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            student = _ref1[_j];
            $http.get('http://localhost/scores/' + student.score_id).success(function(score_data) {
              score_data.status = 'graded';
              return $http.put('http://localhost/scores/' + score_data.score_id, score_data);
            });
            console.log(student.username);
            notify = {
              sender: $scope.classroom.username,
              receiver: student.username,
              content: "นักเรียนในหลักสูตร" + $scope.classroom.title + " (" + $scope.classroom.code + ") สอบเสร็จครบทุกคนแล้ว กรุณาเข้าไปดู ผลการตรวจและรอความเห็นจากครูผู้สอน",
              status: 0,
              url: '#/grading/' + student.score_id
            };
            $http.post('http://localhost/notifications', notify);
          }
          $scope.classroom.sentNotifyTest = true;
          $http.put('http://localhost/courses/' + $scope.classroom.code, $scope.classroom).success(function() {
            notify = {
              sender: $scope.classroom.code,
              receiver: $scope.classroom.username,
              content: "นักเรียนในหลักสูตร" + $scope.classroom.title + " (" + $scope.classroom.code + ") สอบเสร็จครบทุกคนแล้ว กรุณาเข้าไปตรวจสอบและให้คำแนะนำแก่นักเรียน",
              status: 0,
              url: '#/classroom/' + $scope.classroom.classroom + '?test=' + $scope.classroom.code
            };
            return $http.post('http://localhost/notifications', notify).success(function() {
              return window.location.reload();
            });
          });
        }
      }
      _ref2 = $scope.classroom.tested_students;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        s = _ref2[_k];
        if ($rootScope.current_user.username === s.username) {
          $scope.isTested = true;
          $http.get('http://localhost/scores/' + s.score_id).success(function(score_data) {
            $scope.testdate = score_data.submit_date;
            return $scope.score_id = score_data.score_id;
          });
          break;
        }
      }
      angular.element('.modal-trigger').leanModal();
      angular.element('.tooltipped').tooltip({
        delay: 50
      });
      angular.element('.test-container-action, .practice-container, .test-container,.answer-container-action').hide();
      angular.element('#video-item').attr('src', 'videos/' + $scope.classroom.code + '/' + $scope.classroom.sections[0].name + '/' + $scope.classroom.sections[0].contents[0].content_url);
      _ref3 = course_data.sections;
      for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
        section = _ref3[_l];
        _ref4 = section.contents;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          content = _ref4[_m];
          content.section_name = section.name;
          $scope.contents.push(content);
          if (content.type === 'practice') {
            content.answer_box = [];
            $scope.questions[content.answer_type].push(content);
          } else if (content.type === 'test') {
            content.answer_box = [];
            $scope.tests.push(content);
          }
        }
      }
      _ref5 = ['tfq', 'multiple', 'tfqx', 'text', 'multitext', 'ordering', 'matching', 'drapdrop'];
      for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
        type = _ref5[_n];
        _ref6 = $scope.questions[type];
        for (_o = 0, _len6 = _ref6.length; _o < _len6; _o++) {
          q = _ref6[_o];
          i = 1;
          while (i <= q.number_of_question) {
            q.answer_box.push(i);
            i++;
          }
        }
      }
      if ($location.search().id === void 0) {
        return showContentById($scope.contents[0].id);
      } else {
        return showContentById($location.search().id);
      }
    });
  });

}).call(this);

/*
//@ sourceMappingURL=course.js.map
*/
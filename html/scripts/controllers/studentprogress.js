(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('StudentprogressCtrl', function($scope, $rootScope, $cookies, $routeParams, $http) {
    var check, drawChart, filterContent, showContent, switchStudent;
    $rootScope.title = "พัฒนาการนักเรียน";
    $scope.current_class_index = '0';
    $scope.showQuestion = false;
    $scope.classes = [];
    $http.get('http://localhost/users/' + $cookies.get('current_user')).success(function(user_data) {
      var classroom, _i, _len, _ref, _results;
      _ref = user_data.classrooms;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        classroom = _ref[_i];
        _results.push($http.get('http://localhost/classrooms/' + classroom).success(function(classroom_data) {
          var uc, _j, _len1, _ref1;
          classroom_data.course_details = [];
          _ref1 = classroom_data.courses;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            uc = _ref1[_j];
            $http.get('http://localhost/courses/' + uc).success(function(course_data) {
              var std, _k, _len2, _ref2;
              course_data.std_details = [];
              _ref2 = course_data.students;
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                std = _ref2[_k];
                $http.get('http://localhost/users/' + std).success(function(std_data) {
                  var b, id, _l, _len3, _len4, _m, _ref3, _ref4;
                  std_data.badge_details = [];
                  _ref3 = std_data.badges;
                  for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                    b = _ref3[_l];
                    $http.get('http://localhost/badges/' + b.id).success(function(badge_data) {
                      return std_data.badge_details.push(badge_data);
                    });
                  }
                  std_data.total_scores = 0;
                  _ref4 = std_data.scores;
                  for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
                    id = _ref4[_m];
                    $http.get('http://localhost/scores/' + id).success(function(score_data) {
                      return std_data.total_scores += score_data.score;
                    });
                  }
                  return course_data.std_details.push(std_data);
                });
              }
              return classroom_data.course_details.push(course_data);
            });
          }
          $scope.classes.push(classroom_data);
          return check();
        }));
      }
      return _results;
    });
    $scope.toDrawChart = function(event) {
      return drawChart(angular.element(event.target).attr('data-username'));
    };
    drawChart = function(username) {
      $scope.time = [];
      $scope.scores = [];
      $scope.classname = [];
      $http.get('http://localhost/chartusers/' + username).success(function(charts_data) {
        var s, sumtime, t, video, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        $scope.chart_data = charts_data;
        $scope.classname.push($scope.chart_data.title + " " + "(" + $scope.chart_data.code + ")");
        sumtime = 0;
        _ref = $scope.chart_data.videos;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          video = _ref[_i];
          if (video.time.length !== 0) {
            _ref1 = video.time;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              t = _ref1[_j];
              sumtime += t;
            }
            $scope.time.push(sumtime);
          } else {
            $scope.time.push(0);
          }
        }
        _ref2 = $scope.chart_data.scores;
        _results = [];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          s = _ref2[_k];
          _results.push($scope.scores.push(s.score));
        }
        return _results;
      });
      $scope.chartConfig = {
        options: {
          chart: {
            zoomType: 'xy'
          }
        },
        series: [
          {
            name: $scope.classname,
            type: 'column',
            data: $scope.time,
            tooltip: {
              valueSuffix: ' นาที'
            }
          }, {
            name: 'แบบทดสอบ',
            type: 'spline',
            yAxis: 1,
            data: $scope.scores,
            tooltip: {
              valueSuffix: ' คะแนน'
            }
          }
        ],
        title: {
          text: 'ภาพรวมการเรียน | เซต'
        },
        xAxis: [
          {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            title: {
              enabled: true,
              text: 'เดือน สิงหาคม'
            }
          }
        ],
        yAxis: [
          {
            labels: {
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            title: {
              text: 'เวลา (นาที)',
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            max: 100,
            min: 0
          }, {
            labels: {
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            title: {
              text: 'คะแนนสอบ (คะแนน)',
              style: {
                color: Highcharts.getOptions().colors[1]
              }
            },
            opposite: true,
            max: 100,
            min: 0
          }
        ],
        tooltip: {
          formatter: function() {
            return 'วันที่' + this.x + 'สิงหาคม';
          }
        }
      };
      return false;
    };
    $scope.showTooltip = function() {
      angular.element('.tooltipped').tooltip({
        delay: 50
      });
      return false;
    };
    showContent = function(id) {
      angular.element('.classroom-content').hide();
      angular.element('.' + id).show();
      drawChart(angular.element(angular.element('.' + id).find('tr')[1]).attr('data-username'));
      return false;
    };
    filterContent = function(subject) {
      angular.element('.content').hide();
      angular.element(subject).show();
      return false;
    };
    switchStudent = function(student) {
      angular.element('.stdDetailCard, .content').hide();
      angular.element(student + ',.recent-activity').show();
      angular.element('.btn-flat').removeClass('active');
      angular.element('.recent-activity-btn').addClass('active');
      return false;
    };
    check = function() {
      if ($routeParams.classcode !== void 0) {
        return showContent($routeParams.classcode);
      } else {
        angular.element('.classroom-content').hide();
        angular.element('.' + angular.element('select').val()).show();
        if ($scope.classes !== []) {
          return drawChart($scope.classes[0].students[0]);
        }
      }
    };
    $scope.showDetail = function(event) {
      angular.element('.stdname').removeClass('selected');
      angular.element(event.target).parent().addClass('selected');
      switchStudent('#' + angular.element(event.target).attr('data-username'));
      return false;
    };
    angular.element('.course-selector').on('change', function() {
      showContent(angular.element(this).val());
      return false;
    });
    angular.element('.select-student').on('change', function() {
      switchStudent('#' + angular.element(this).val());
      return false;
    });
    $scope.switchContent = function(event) {
      if (angular.element(event.target)[0].tagName === 'DIV') {
        angular.element('.btn-flat').removeClass('active');
        angular.element(event.target).addClass('active');
        filterContent('.' + angular.element(event.target).attr('data-value'));
      } else {
        angular.element('.btn-flat').removeClass('active');
        angular.element(event.target).parent().addClass('active');
        filterContent('.' + angular.element(event.target).parent().attr('data-value'));
      }
      return false;
    };
    return $scope.setAndshowDetail = function(student, activity) {
      $scope.showActivityDetail = true;
      angular.element('.show-detail').show();
      $scope.seeDetail = {
        student: student,
        activity: activity
      };
      return false;
    };
  });

}).call(this);

/*
//@ sourceMappingURL=studentprogress.js.map
*/
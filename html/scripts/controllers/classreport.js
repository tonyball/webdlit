(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('ClassreportCtrl', function($scope, $rootScope, $http, $routeParams, $cookies) {
    var drawChart, showContent;
    $rootScope.title = "ภาพรวมห้องเรียน";
    $scope.classes = [];
    $scope.current_class_index = 0;
    angular.element('.tooltipped').tooltip({
      delay: 50
    });
    angular.element('.cards-report').hide();
    angular.element('.classroom-select').on('change', function() {
      showContent(angular.element(this).val());
      return false;
    });
    angular.element('.report-type').on('change', function() {
      angular.element('.report').hide();
      angular.element('.' + $(this).val()).show();
      return false;
    });
    $http.get('http://localhost/users/' + $cookies.get('current_user')).success(function(user) {
      var classroom, _i, _len, _ref, _results;
      $rootScope.current_user = user;
      _ref = $rootScope.current_user.classrooms;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        classroom = _ref[_i];
        _results.push($http.get('http://localhost/classrooms/' + classroom).success(function(classroom_data) {
          var uc, _j, _len1, _ref1, _results1;
          classroom_data.course_details = [];
          _ref1 = classroom_data.courses;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            uc = _ref1[_j];
            _results1.push($http.get('http://localhost/courses/' + uc).success(function(course_data) {
              var std, _k, _len2, _ref2;
              course_data.std_details = [];
              _ref2 = course_data.students;
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                std = _ref2[_k];
                $http.get('http://localhost/users/' + std).success(function(std_data) {
                  var b, _l, _len3, _ref3;
                  std_data.badge_details = [];
                  _ref3 = std_data.badges;
                  for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
                    b = _ref3[_l];
                    $http.get('http://localhost/badges/' + b.id).success(function(badge_data) {
                      return std_data.badge_details.push(badge_data);
                    });
                  }
                  return course_data.std_details.push(std_data);
                });
              }
              course_data.chart = drawChart(course_data.code);
              classroom_data.course_details.push(course_data);
              $scope.classes.push(classroom_data);
              if ($routeParams.classcode === void 0) {
                return showContent($scope.classes[0].code);
              }
            }));
          }
          return _results1;
        }));
      }
      return _results;
    });
    showContent = function(id) {
      angular.element('.chart-report').show();
      angular.element('#' + id).show();
      return false;
    };
    if ($routeParams.classcode !== void 0) {
      showContent($routeParams.classcode);
      console.log('classroom=> ' + $routeParams.classcode);
    }
    if ($routeParams.coursecode !== void 0) {
      showContent($routeParams.coursecode);
      console.log('course=> ' + $routeParams.coursecode);
    }
    $scope.xaxis = [];
    $scope.time = [];
    $scope.scores = [];
    $scope.classname = [];
    return drawChart = function(coursecode) {
      $http.get('http://localhost/chartcourses/' + coursecode).success(function(charts_data) {
        var data_user, s, t, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        $scope.chart_data = charts_data;
        $scope.classname.push($scope.chart_data.title + " " + "(" + $scope.chart_data.code + ")");
        _ref = $scope.chart_data.users;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data_user = _ref[_i];
          $scope.xaxis.push(data_user.username);
          $scope.sumtime = 0;
          $scope.sumscore = 0;
          _ref1 = data_user.videos.time;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            t = _ref1[_j];
            $scope.sumtime += t;
          }
          _ref2 = data_user.scores;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            s = _ref2[_k];
            $scope.sumscore += s;
          }
          $scope.time.push($scope.sumtime);
          _results.push($scope.scores.push($scope.sumscore));
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
            categories: $scope.xaxis
          }
        ],
        yAxis: [
          {
            min: 0,
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
            }
          }, {
            min: 0,
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
            opposite: true
          }
        ],
        tooltip: {
          shared: true
        }
      };
      return $scope.chartConfig;
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classreport.js.map
*/
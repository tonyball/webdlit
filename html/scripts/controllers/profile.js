(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('ProfileCtrl', function($scope, $rootScope, $http, $routeParams) {
    $rootScope.title = "ข้อมูลส่วนตัว";
    $scope.editorOptions = {
      language: 'th',
      uiColor: '#ffffff',
      height: '150'
    };
    $scope.closeBadgesContainer = function() {
      angular.element('.all-badges-container').hide();
      return false;
    };
    $scope.selectBadge = function(event) {
      var b, elem, index, status, _i, _j, _len, _len1, _ref, _ref1;
      status = {};
      if ($scope.number_of_show_badge < 6) {
        elem = angular.element(event.target);
        if (elem.hasClass('selected-badge')) {
          $scope.number_of_show_badge--;
          _ref = $scope.user.show_badges;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            b = _ref[_i];
            if (elem.attr('data-badge-id') === b.id) {
              status.del = 1;
              status.obj = b;
            }
          }
        } else {
          $scope.number_of_show_badge++;
          _ref1 = $scope.user.badge_details;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            b = _ref1[_j];
            if (elem.attr('data-badge-id') === b.id) {
              status.del = 0;
              status.obj = b;
            }
          }
        }
        angular.element(event.target).toggleClass('selected-badge');
        if (status.del) {
          index = $scope.user.show_badges.indexOf(status.obj);
          $scope.user.show_badges.splice(index, 1);
          $scope.slots.push(status.obj.id);
        } else if (status.del === 0) {
          $scope.slots.splice($scope.slots.indexOf(status.obj.id), 1);
          $scope.user.show_badges.push(status.obj);
        }
      } else {
        alert('จำนวนเหรียญที่แสดงได้ครบแล้ว');
      }
      return false;
    };
    $scope.time = [];
    $scope.scores = [];
    $scope.score_names = [];
    $scope.classname = [];
    $http.get('http://localhost/chartusers/' + $routeParams.username).success(function(charts_data) {
      var s, sumtime, _i, _len, _ref;
      $scope.chart_data = charts_data;
      $scope.classname.push($scope.chart_data.title + " " + "(" + $scope.chart_data.code + ")");
      sumtime = 0;
      _ref = $scope.chart_data.scores;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        $scope.score_names.push(s.name);
        $scope.scores.push(s.score);
      }
      return angular.element('#chart').highcharts({
        options: {
          chart: {
            zoomType: 'xy'
          }
        },
        series: [
          {
            name: 'ดูบทเรียน',
            type: 'spline',
            data: $scope.chart_data.times,
            tooltip: {
              name: 'รวม',
              valuePrefix: 'ใช้เวลาไป ',
              valueSuffix: ' นาที'
            }
          }, {
            name: 'ทำแบบทดสอบ',
            type: 'column',
            yAxis: 1,
            data: $scope.scores,
            tooltip: {
              name: 'เรื่อง' + $scope.score_names,
              valuePrefix: ' ได้ ',
              valueSuffix: ' คะแนน'
            }
          }
        ],
        title: {
          text: $scope.classname
        },
        xAxis: [
          {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            title: {
              enabled: true,
              text: $scope.chart_data.month
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
            min: 0
          }
        ],
        tooltip: {
          formatter: function() {
            return '<b>วันที่</b> ' + this.x + ' <b>เดือน</b> ' + $scope.chart_data.month + '<br>' + this.series.tooltipOptions.name + '<b>' + this.series.tooltipOptions.valuePrefix + '</b> ' + this.y + ' <b>' + this.series.tooltipOptions.valueSuffix + '</b>';
          }
        }
      });
    });
    if ($routeParams.username === void 0) {
      $routeParams.username = $rootScope.current_user.username;
    }
    return $http.get('http://localhost/users/' + $routeParams.username).success(function(user_data) {
      var b, s, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      $scope.user = user_data;
      $scope.user.meteorite = 0;
      $scope.user.moon = 0;
      $scope.user.sun = 0;
      $scope.user.earth = 0;
      $scope.user.blackhole = 0;
      $scope.user.show_badges = [];
      $scope.user.badge_details = [];
      $scope.isCurrentStudent = false;
      $scope.number_of_show_badge = 0;
      $scope.user.total_scores = 0;
      $scope.user.messages = [];
      _ref = $scope.user.scores;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        $http.get('http://localhost/scores/' + s).success(function(score_data) {
          return $scope.user.total_scores += score_data.score;
        });
      }
      if ($scope.user.role === '0' || $scope.user.role === false) {
        $scope.isCurrentStudent = true;
      }
      if ($scope.isCurrentStudent === false) {
        $http.get('http://localhost/messages').success(function(message_data) {
          var msg, _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = message_data.length; _j < _len1; _j++) {
            msg = message_data[_j];
            if (msg.receiver === $scope.user.username) {
              _results.push($scope.user.messages.push(msg));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      }
      _ref1 = $scope.user.badges;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        b = _ref1[_j];
        if (b.status === 1) {
          $http.get('http://localhost/badges/' + b.id).success(function(badge_data) {
            var slot, _results;
            $scope.user.show_badges.push(badge_data);
            $scope.number_of_show_badge++;
            slot = 6 - $scope.user.show_badges.length;
            $scope.slots = [];
            _results = [];
            while (slot > 0) {
              $scope.slots.push(slot);
              _results.push(slot--);
            }
            return _results;
          });
        }
      }
      _ref2 = $scope.user.badges;
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        b = _ref2[_k];
        _results.push($http.get('http://localhost/badges/' + b.id).success(function(badge_data) {
          $scope.user.badge_details.push(badge_data);
          if (badge_data.group === "meteorite") {
            return $scope.user.meteorite++;
          } else if (badge_data.group === "moon") {
            return $scope.user.moon++;
          } else if (badge_data.group === "sun") {
            return $scope.user.sun++;
          } else if (badge_data.group === "earth") {
            return $scope.user.earth++;
          } else {
            return $scope.user.blackhole++;
          }
        }));
      }
      return _results;
    });
  });

}).call(this);

/*
//@ sourceMappingURL=profile.js.map
*/
'use strict'

angular.module('newkruDlitApp')
  .controller 'ClassreportCtrl', ($scope, $rootScope, $http, $routeParams, $cookies) ->
    $rootScope.title = "ภาพรวมห้องเรียน"
    $scope.classes = []
    $scope.current_class_index = 0
    angular.element('.tooltipped').tooltip({delay: 50})
    angular.element('.cards-report').hide()
    angular.element('.classroom-select').on 'change', ->
      showContent(angular.element(this).val())
      return false
    angular.element('.report-type').on 'change', ->
      angular.element('.report').hide()
      angular.element('.' + $(this).val()).show()
      return false

    $http.get('http://localhost/users/'+$cookies.get('current_user')).success (user) ->
      $rootScope.current_user = user
      for classroom in $rootScope.current_user.classrooms
        $http.get('http://localhost/classrooms/'+classroom).success (classroom_data) ->
          classroom_data.course_details = []
          for uc in classroom_data.courses
            $http.get('http://localhost/courses/'+uc).success (course_data) ->
              course_data.std_details = []
              for std in course_data.students
                $http.get('http://localhost/users/'+std).success (std_data) ->
                  std_data.badge_details = []
                  for b in std_data.badges
                    $http.get('http://localhost/badges/'+b.id).success (badge_data) ->
                      std_data.badge_details.push badge_data
                  course_data.std_details.push std_data
              course_data.chart = drawChart(course_data.code)
              classroom_data.course_details.push course_data
              $scope.classes.push classroom_data
              if $routeParams.classcode == undefined
                showContent($scope.classes[0].code)

    showContent = (id) ->
      angular.element('.chart-report').show()
      angular.element('#'+id).show()
      return false

    if $routeParams.classcode != undefined
      showContent($routeParams.classcode)
      console.log 'classroom=> '+$routeParams.classcode
    if $routeParams.coursecode != undefined
      showContent($routeParams.coursecode)
      console.log 'course=> '+$routeParams.coursecode
    $scope.xaxis = []
    $scope.time = []
    $scope.scores = []
    $scope.classname = []

    drawChart = (coursecode) ->
      $http.get('http://localhost/chartcourses/'+coursecode).success (charts_data) ->
        $scope.chart_data = charts_data
        $scope.classname.push($scope.chart_data.title+" "+"("+$scope.chart_data.code+")")
        for data_user in $scope.chart_data.users
          $scope.xaxis.push data_user.username
          $scope.sumtime = 0
          $scope.sumscore = 0
          for t in data_user.videos.time
            $scope.sumtime += t
          for s in data_user.scores
            $scope.sumscore += s
          $scope.time.push $scope.sumtime
          $scope.scores.push $scope.sumscore
      
      $scope.chartConfig = {
        options: {
          chart: {
            zoomType: 'xy'
          }
        },
        series: [{
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
          }],
          title: {
            text: 'ภาพรวมการเรียน | เซต'
          },
          xAxis: [{
            categories: $scope.xaxis
          }],
          yAxis: [{
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
          },{ 
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
          }],
        tooltip: {
          shared: true
        }
      }
      return $scope.chartConfig


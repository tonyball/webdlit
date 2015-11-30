'use strict'

angular.module('newkruDlitApp')
  .controller 'StudentprogressCtrl', ($scope, $rootScope, $cookies, $routeParams, $http) ->
    $rootScope.title = "พัฒนาการนักเรียน"
    $scope.current_class_index = '0'
    $scope.showQuestion = false

    $scope.classes = []
    $http.get('http://localhost/users/'+$cookies.get('current_user')).success (user_data) ->
      for classroom in user_data.classrooms
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
                  std_data.total_scores = 0
                  for id in std_data.scores
                    $http.get('http://localhost/scores/'+id).success (score_data) ->
                      std_data.total_scores += score_data.score
                  course_data.std_details.push std_data
              classroom_data.course_details.push course_data
          $scope.classes.push classroom_data
          check()

    $scope.toDrawChart = (event) ->
      drawChart(angular.element(event.target).attr('data-username'))

    drawChart = (username) ->
      $scope.time = []
      $scope.scores = []
      $scope.classname = []
      $http.get('http://localhost/chartusers/'+username).success (charts_data) ->
        $scope.chart_data = charts_data
        $scope.classname.push($scope.chart_data.title+" "+"("+$scope.chart_data.code+")")
        sumtime = 0
        for video in $scope.chart_data.videos
          if video.time.length != 0
            for t in video.time
              sumtime += t
            $scope.time.push sumtime
          else
            $scope.time.push 0
        for s in $scope.chart_data.scores
          $scope.scores.push s.score

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
            categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            title: {
              enabled: true,
              text: 'เดือน สิงหาคม'
            }
          }],
          yAxis: [{ 
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
            max : 100
            min : 0
          },{ 
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
            max : 100
            min : 0
          }],
          tooltip: {
            formatter: -> 
              'วันที่' + this.x + 'สิงหาคม'       
          }
        }

      return false

    $scope.showTooltip = ->
      angular.element('.tooltipped').tooltip({delay: 50});
      return false
    
    showContent = (id) ->
      angular.element('.classroom-content').hide()
      angular.element('.' + id).show()
      drawChart(angular.element(angular.element('.'+id).find('tr')[1]).attr('data-username'))
      return false

    filterContent = (subject) ->
      angular.element('.content').hide()
      angular.element(subject).show()
      return false

    switchStudent = (student) ->
      angular.element('.stdDetailCard, .content').hide()
      angular.element(student + ',.recent-activity').show()
      angular.element('.btn-flat').removeClass 'active'
      angular.element('.recent-activity-btn').addClass 'active'
      return false

    check = ->
      if $routeParams.classcode != undefined
        showContent($routeParams.classcode)
      else
        angular.element('.classroom-content').hide()
        angular.element('.'+angular.element('select').val()).show()
        if $scope.classes != []
          drawChart($scope.classes[0].students[0])

    $scope.showDetail = (event) ->
      angular.element('.stdname').removeClass 'selected'
      angular.element(event.target).parent().addClass 'selected'
      switchStudent '#' + angular.element(event.target).attr('data-username')
      return false

    angular.element('.course-selector').on 'change', ->
      showContent(angular.element(this).val())
      return false

    angular.element('.select-student').on 'change', ->
      switchStudent '#' + angular.element(this).val()
      return false

    $scope.switchContent = (event) ->
      if angular.element(event.target)[0].tagName == 'DIV'
        angular.element('.btn-flat').removeClass 'active'
        angular.element(event.target).addClass 'active'
        filterContent '.' + angular.element(event.target).attr('data-value')
      else
        angular.element('.btn-flat').removeClass 'active'
        angular.element(event.target).parent().addClass 'active'
        filterContent '.' + angular.element(event.target).parent().attr('data-value')
      return false

    $scope.setAndshowDetail = (student, activity) ->
      $scope.showActivityDetail = true
      angular.element('.show-detail').show()
      $scope.seeDetail = {student:student,activity:activity}
      return false
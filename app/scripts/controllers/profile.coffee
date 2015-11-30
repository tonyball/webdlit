'use strict'

angular.module('newkruDlitApp')
  .controller 'ProfileCtrl', ($scope, $rootScope, $http,$routeParams) ->
    $rootScope.title = "ข้อมูลส่วนตัว"
    $scope.editorOptions = {language: 'th', uiColor: '#ffffff', height:'150'}

    $scope.closeBadgesContainer = ->
    	angular.element('.all-badges-container').hide()
    	return false
    $scope.selectBadge = (event) ->
      status = {}
      if $scope.number_of_show_badge < 6
        elem = angular.element(event.target)
        if elem.hasClass('selected-badge')
          $scope.number_of_show_badge--
          for b in $scope.user.show_badges
            if elem.attr('data-badge-id') == b.id
              status.del = 1
              status.obj = b
        else
          $scope.number_of_show_badge++
          for b in $scope.user.badge_details
            if elem.attr('data-badge-id') == b.id
              status.del = 0
              status.obj = b
        angular.element(event.target).toggleClass('selected-badge')
        if status.del
          index = $scope.user.show_badges.indexOf(status.obj)
          $scope.user.show_badges.splice(index, 1)
          $scope.slots.push status.obj.id
        else if status.del == 0
          $scope.slots.splice($scope.slots.indexOf(status.obj.id),1)
          $scope.user.show_badges.push status.obj
      else
        alert 'จำนวนเหรียญที่แสดงได้ครบแล้ว'
      return false

    $scope.time = []
    $scope.scores = []
    $scope.score_names = []
    $scope.classname = []
    $http.get('http://localhost/chartusers/'+$routeParams.username).success (charts_data) ->
      $scope.chart_data = charts_data
      $scope.classname.push($scope.chart_data.title+" "+"("+$scope.chart_data.code+")")
      sumtime = 0
      for s in $scope.chart_data.scores
        $scope.score_names.push s.name
        $scope.scores.push s.score
      angular.element('#chart').highcharts({
        options: {
          chart: {
            zoomType: 'xy'
          }
        },
        series: [{
            name: 'ดูบทเรียน',
            type: 'spline',
            data: $scope.chart_data.times,
            tooltip: {
              valuePrefix: 'ใช้เวลาไป '
              valueSuffix: ' นาที'
            }
          }, {
            name: 'ทำแบบทดสอบ',
            type: 'column',
            yAxis: 1,
            data: $scope.scores,
            tooltip: {
              valuePrefix: ' ได้ ',
              valueSuffix: ' คะแนน'
            }
          }],
          title: {
            text: $scope.classname
          },
          xAxis: [{
            categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            title: {
              enabled: true,
              text: $scope.chart_data.month
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
            min : 0,
            max: 120
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
            min : 0
          }]
          tooltip: {
            formatter: ->
              return '<b>วันที่</b> ' + this.x + ' <b>เดือน</b> ' + $scope.chart_data.month + '<br><b>'+this.series.tooltipOptions.valuePrefix+'</b> '+this.y+' <b>'+this.series.tooltipOptions.valueSuffix+'</b>'
              shared:true
          }
      })

    if $routeParams.username == undefined
      $routeParams.username = $rootScope.current_user.username
    $http.get('http://localhost/users/'+$routeParams.username).success (user_data) ->
      $scope.user = user_data
      $scope.user.meteorite = 0
      $scope.user.moon = 0
      $scope.user.sun = 0
      $scope.user.earth = 0
      $scope.user.blackhole = 0
      $scope.user.show_badges = []
      $scope.user.badge_details = []
      $scope.isCurrentStudent = false
      $scope.number_of_show_badge = 0
      $scope.user.total_scores = 0
      $scope.user.messages = []
      for s in $scope.user.scores
        $http.get('http://localhost/scores/'+s).success (score_data) ->
          $scope.user.total_scores += score_data.score

      if $scope.user.role == '0' or $scope.user.role == false
        $scope.isCurrentStudent = true

      if $scope.isCurrentStudent == false
        $http.get('http://localhost/messages').success (message_data) ->
          for msg in message_data
            if msg.receiver == $scope.user.username
              $scope.user.messages.push msg
      for b in $scope.user.badges
        if b.status == 1
          $http.get('http://localhost/badges/'+b.id).success (badge_data) ->
            $scope.user.show_badges.push badge_data
            $scope.number_of_show_badge++
            slot = 6 - $scope.user.show_badges.length
            $scope.slots = []
            while slot > 0
              $scope.slots.push slot
              slot--
      for b in $scope.user.badges
        $http.get('http://localhost/badges/'+b.id).success (badge_data) ->
          $scope.user.badge_details.push badge_data
          if badge_data.group == "meteorite"
            $scope.user.meteorite++
          else if badge_data.group == "moon"
            $scope.user.moon++
          else if badge_data.group == "sun"
            $scope.user.sun++
          else if badge_data.group == "earth"
            $scope.user.earth++
          else
            $scope.user.blackhole++
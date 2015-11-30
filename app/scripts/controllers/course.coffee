'use strict'

angular.module('newkruDlitApp')
  .controller 'CourseCtrl', ($scope, $rootScope, $routeParams, $http,Pagination, $location, $interval, $cookies,$filter) ->
    $scope.classroom = {}
    $rootScope.title = "หลักสูตร​ "
    $scope.rendered = ''
    $scope.playing = false
    $scope.timestop = false
    $scope.isAdded = false
    $scope.seconds = 0
    $scope.minutes = 0
    $scope.current_object = {}
    $scope.frameWidth = window.innerWidth
    $scope.today = new Date()
    $scope.check_answers = []
    $scope.submit_answer = []
    $scope.contents = []
    $scope.questions = {
      tfq:[],
      text:[],
      multiple:[],
      tfqx:[],
      multitext:[],
      ordering:[],
      matching:[],
      drapdrop:[]
    }
    $scope.tests = []
    $scope.current_content = ''
    $scope.test_number = 4
    $scope.sent = false
    $scope.data = false
    $scope.selectedColor = '#000000'

   	angular.element('.modal-trigger').leanModal()
   	angular.element('.tooltipped').tooltip delay: 50

    angular.element('#video-item').bind 'ended', ->
      alert('a')

    $http.get('http://localhost/chartusers').success (chart_data) ->
      for chart in chart_data
        if chart.username == $cookies.get('current_user')
          if chart.month == $filter('date')($scope.today,'MMMM')
            $scope.chart = chart
            break

    showContentById = (content_id) ->
      $scope.check_answers = []
      $scope.submit_answer = []
      $scope.current_content = content_id
      for cont in $scope.contents
        if cont.id == $scope.current_content
          $scope.content = cont
          break
      $scope.current_section = $scope.content.section_name
      if $scope.content.type == 'video'
        $scope.switchContent '.' + $scope.content.type + '-container', $scope.content.type, $scope.content.content_url, $scope.content.title, $scope.content.id
      else
        $scope.switchContent '.' + $scope.content.type + '-container', $scope.content.type, $routeParams.coursecode+'/'+$scope.content.section_name+'/'+$scope.content.content_url, $scope.content.title, $scope.content.id
      return false

    setAnswer = ->
      $scope.tests[0].answer_box = []
      i = 1
      while i <= $scope.tests[0].number_of_question[$scope.test_number-1]
        $scope.tests[0].answer_box.push i
        i++

    $scope.timing = (event) ->
      if $scope.playing == false
        event.target.play()
        $scope.playing = true
        $scope.startTime()
      else if $scope.playing == true
        event.target.pause()
        $scope.playing = false
        $scope.stopTime()
      return false

    $scope.startTime = ->
      $scope.promise = $interval($scope.plusTime,1000)
      return false

    $scope.plusTime = ->
      $scope.day_number = parseInt($filter('date')($scope.today, 'd'))
      if $scope.seconds == 60
        $scope.minutes++
        $scope.seconds = 0
        if $scope.chart == undefined
          aChart = {username:$cookies.get('current_user'),month:$filter('date')($scope.today,'MMMM'),title:$scope.classroom.title,code:$scope.classroom.code,times:[],scores:[]}
          i = 0
          while i <= 30
            aChart.times.push 0
            aChart.scores.push {name:'',score:0}
            i++
          aChart.times[$scope.day_number-1] += $scope.minutes
          $http.post('http://localhost/chartusers',aChart).success (data) ->
            $scope.chart = data
        else if $scope.chart != undefined
          $scope.chart.times[$scope.day_number-1] += $scope.minutes
          $http.put('http://localhost/chartusers/'+$scope.chart._id, $scope.chart).success (data) ->
            $scope.chart = data
      else
        $scope.seconds++
      return false

    $scope.stopTime = ->
      angular.element('#video-item').get(0).pause()
      $scope.playing = false
      $interval.cancel($scope.promise)
      return false

    $scope.showDetailedAnswer = ->
      splited = $scope.file_name.split('.')
      answer_file = splited[0]+'-Key.pdf'
      angular.element('#test-item').attr 'data', 'contents/' + answer_file
      angular.element('.content-title').text('เฉลยแบบทดสอบ ')
      return false

    $scope.openAnswerSheet = (event) ->
      angular.element(event.target).hide()
      angular.element('.answer-test-container,.answer-container,.answer-container-action,#open-classroom-sidenav').fadeIn()
      angular.element('.classroom-sidenav-container,.questions').hide()
      angular.element('#question-'+$scope.content.id).fadeIn()
      angular.element('#practice-item-pdf,#test-item,#practice-item-img').addClass('m9 s12')
      angular.element('.answer-container').addClass('s12 m3')
      angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12')
      if angular.element(event.target).attr('id') == 'open-test-answer-sheet'
        $scope.clock.start()
        angular.element('.answer-container-action').hide()
      return false

    $scope.openClassroomSidenav = (event) ->
      angular.element(event.target).hide()
      angular.element('.answer-test-container,.answer-container,.answer-container-action').hide()
      angular.element('.classroom-sidenav-container,#open-test-answer-sheet,#open-practice-answer-sheet').fadeIn()
      angular.element('#practice-item-pdf,#test-item,#practice-item-img').removeClass('m9 s12')
      angular.element('.main-content-container').removeClass('m12 s12').addClass('m9 s12')
      if $scope.content.type == 'video'
        angular.element('#open-practice-answer-sheet,#open-test-answer-sheet').hide()
      if $scope.test_number != 0
        angular.element('#open-practice-answer-sheet').hide()
      else
        angular.element('#open-test-answer-sheet').hide()
      return false

    $scope.switchContent = (content, type, url, title, content_id) ->
      $scope.isAdded = false
      angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12')
      angular.element('.content-container, .action-container,.classroom-sidenav-container').hide()
      angular.element(content + ',' + content + '-action, #open-classroom-sidenav').fadeIn()
      angular.element('.content-title').text title
      if type == 'video'
        angular.element('.open-answer-sheet-btn,.answer-container,.answer-container-action').hide()
        $scope.test_number = 0
        angular.element('.content-title').fadeIn()
        angular.element('#video-item').attr 'src', url
      else if type == 'practice'
        $scope.test_number = 0
        angular.element('.open-answer-sheet-btn,.questions,.answer-container,.answer-container-action').hide()
        angular.element('#open-practice-answer-sheet').fadeIn()
        if url.split('.')[1] == 'pdf'
          angular.element('#practice-item-pdf').fadeIn().attr 'data', 'contents/' + url
          angular.element('#practice-item-img').hide()
        else
          angular.element('#practice-item-img').fadeIn().attr 'src', 'contents/' + url
          angular.element('#practice-item-pdf').hide()
      else if type =='test'
        angular.element('.answer-test-container,.open-answer-sheet-btn,.answer-container-action,#open-practice-answer-sheet').hide()
        angular.element('#open-test-answer-sheet,.content-title').fadeIn()
        angular.element('.ans-result').text('')
        angular.element('.answer-set').children().attr('disabled',false)
        angular.element('input[type="radio"]').attr('checked',false)
        angular.element('input[type="radio"]+label').removeClass('correct')
        angular.element('input[type="radio"]:checked+label').removeClass('correct, incorrect')
        $scope.test_number = 4
        splited = url.split '.'
        $scope.file_name = splited[0]+'-'+$scope.test_number+'.'+splited[1]
        setAnswer()
        angular.element('#test-item').attr 'data', 'contents/' + $scope.file_name
        angular.element('.submit-btn').addClass('show-body').removeClass('hide-card')
        $scope.sent = false
        $scope.clock = angular.element('.exam-clock').FlipClock(
          autoStart: false
          clockFace: 'MinuteCounter')
        $scope.clock.setTime($scope.tests[0].time[$scope.test_number-1]*60)
        $scope.clock.setCountdown true
      return false

    $scope.hidePanel = ->
    	angular.element('#special-input-panel').hide()
    	return false

    $http.get('http://localhost/courses/'+$routeParams.coursecode).success (course_data) ->
      $scope.classroom = course_data
      $rootScope.title = "หลักสูตร​ "+$scope.classroom.title
      $scope.isTested = false
      $http.get('http://localhost/classrooms/'+$scope.classroom.classroom).success (classroom_data) ->
        $scope.classroom.students = classroom_data.students

      count = 0
      for ts in $scope.classroom.tested_students
        if $scope.classroom.students.indexOf(ts.username) != -1
          count++
      if count == $scope.classroom.students.length
        if $scope.classroom.sentNotifyTest == false
          for student in $scope.classroom.tested_students
            $http.get('http://localhost/scores/'+student.score_id).success (score_data) ->
              score_data.status = 'graded'
              $http.put('http://localhost/scores/'+score_data.score_id,score_data)
            console.log student.username
            notify = {sender:$scope.classroom.username,receiver:student.username,content:"นักเรียนในหลักสูตร"+$scope.classroom.title+" ("+$scope.classroom.code+") สอบเสร็จครบทุกคนแล้ว กรุณาเข้าไปดู ผลการตรวจและรอความเห็นจากครูผู้สอน",status:0,url:'#/grading/'+student.score_id}
            $http.post('http://localhost/notifications', notify)
          $scope.classroom.sentNotifyTest = true
          $http.put('http://localhost/courses/'+$scope.classroom.code, $scope.classroom).success ->
            notify = {sender:$scope.classroom.code,receiver:$scope.classroom.username,content:"นักเรียนในหลักสูตร"+$scope.classroom.title+" ("+$scope.classroom.code+") สอบเสร็จครบทุกคนแล้ว กรุณาเข้าไปตรวจสอบและให้คำแนะนำแก่นักเรียน",status:0,url:'#/classroom/'+$scope.classroom.classroom+'?test='+$scope.classroom.code}
            $http.post('http://localhost/notifications', notify).success ->
              window.location.reload()


      for s in $scope.classroom.tested_students
        if $rootScope.current_user.username == s.username
          $scope.isTested = true
          $http.get('http://localhost/scores/'+s.score_id).success (score_data) ->
            $scope.testdate = score_data.submit_date
            $scope.score_id = score_data.score_id
          break
      angular.element('.modal-trigger').leanModal()
      angular.element('.tooltipped').tooltip delay: 50
      angular.element('.test-container-action, .practice-container, .test-container,.answer-container-action').hide()
      angular.element('#video-item').attr('src', 'videos/'+$scope.classroom.code+'/'+$scope.classroom.sections[0].name+'/'+$scope.classroom.sections[0].contents[0].content_url)

      for section in course_data.sections
        for content in section.contents
          content.section_name = section.name
          $scope.contents.push content
          if content.type == 'practice'
            content.answer_box = []
            $scope.questions[content.answer_type].push content
          else if content.type == 'test'
            content.answer_box = []
            $scope.tests.push content

      for type in ['tfq','multiple','tfqx','text','multitext','ordering','matching','drapdrop']
        for q in $scope.questions[type]
          i = 1
          while i <= q.number_of_question
            q.answer_box.push i
            i++

      if $location.search().id == undefined
        showContentById($scope.contents[0].id)
      else
        showContentById($location.search().id)

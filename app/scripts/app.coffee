'use strict'

angular
  .module('newkruDlitApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'simplePagination',
    'pw.canvas-painter',
    'ngDragDrop',
    'highcharts-ng',
    'timer',
    'ngFileUpload',
    'angularRandomString',
    'ngCkeditor'
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/dashboard.html'
        controller: 'DashboardCtrl'
      .when '/badges',
        templateUrl: 'views/badges.html'
        controller: 'BadgesCtrl'
      .when '/classreport',
        templateUrl: 'views/classreport.html'
        controller: 'ClassreportCtrl'
      .when '/classreport/:classcode',
        templateUrl: 'views/classreport.html'
        controller: 'ClassreportCtrl'
      .when '/classreport/:classcode/:coursecode',
        templateUrl: 'views/classreport.html'
        controller: 'ClassreportCtrl'
      .when '/classroom',
        templateUrl: 'views/classroom.html'
        controller: 'ClassroomCtrl'
      .when '/classroom/:classcode',
        templateUrl: 'views/classroom.html'
        controller: 'ClassroomCtrl'
      .when '/course/:coursecode',
        templateUrl: 'views/course.html'
        controller: 'CourseCtrl'
        reloadOnSearch: false
      .when '/dashboard',
        templateUrl: 'views/dashboard.html'
        controller: 'DashboardCtrl'
      .when '/exams',
        templateUrl: 'views/exams.html'
        controller: 'ExamsCtrl'
      .when '/help',
        templateUrl: 'views/help.html'
        controller: 'HelpCtrl'
      .when '/intro',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/manageclass',
        templateUrl: 'views/dashboard.html'
        controller: 'DashboardCtrl'
      .when '/notifications',
        templateUrl: 'views/notifications.html'
        controller: 'NotificationsCtrl'
      .when '/notifications/:id',
        templateUrl: 'views/notifications.html'
        controller: 'NotificationsCtrl'
      .when '/profile',
        templateUrl: 'views/profile.html'
        controller: 'ProfileCtrl'
      .when '/profile/:username',
        templateUrl: 'views/profile.html'
        controller: 'ProfileCtrl'
      .when '/search',
        templateUrl: 'views/search.html'
        controller: 'SearchCtrl'
      .when '/settings',
        templateUrl: 'views/settings.html'
        controller: 'SettingsCtrl'
      .when '/signin',
        templateUrl: 'views/signin.html'
        controller: 'SigninCtrl'
      .when '/signup',
        templateUrl: 'views/signup.html'
        controller: 'SignupCtrl'
      .when '/studentactivity',
        templateUrl: 'views/studentactivity.html'
        controller: 'StudentactivityCtrl'
      .when '/studentactivity/:classcode',
        templateUrl: 'views/studentactivity.html'
        controller: 'StudentactivityCtrl'
      .when '/studentactivity/:classcode/:coursecode',
        templateUrl: 'views/studentactivity.html'
        controller: 'StudentactivityCtrl'
      .when '/studentprogress',
        templateUrl: 'views/studentprogress.html'
        controller: 'StudentprogressCtrl'
      .when '/studentprogress/:classcode',
        templateUrl: 'views/studentprogress.html'
        controller: 'StudentprogressCtrl'
      .when '/studentprogress/:classcode/:coursecode',
        templateUrl: 'views/studentprogress.html'
        controller: 'StudentprogressCtrl'
      .when '/grading',
        templateUrl: 'views/grading.html'
        controller: 'GradingCtrl'
      .when '/grading/:testid',
        templateUrl: 'views/graded-test.html'
        controller: 'GradingTestCtrl'
      .when '/messages',
        templateUrl: 'views/profile.html'
        controller: 'ProfileCtrl'
      .when '/messages/:messageid',
        templateUrl: 'views/read-message.html'
        controller: 'ReadMessageCtrl'
      .otherwise
        redirectTo: '/'


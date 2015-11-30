(function() {
  'use strict';
  angular.module('newkruDlitApp').controller('ReadMessageCtrl', function($scope, $rootScope, $http, $routeParams) {
    $rootScope.title = 'ตอบกลับข้อความ';
    $scope.editorOptions = {
      language: 'th',
      uiColor: '#ffffff',
      height: '150'
    };
    $http.get('http://localhost/messages/' + $routeParams.messageid).success(function(message_data) {
      $scope.message = message_data;
      return $http.get('http://localhost/messages').success(function(data) {
        var d, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          d = data[_i];
          if ($scope.message.reply_to === d._id) {
            _results.push($scope.message.reply_to = d);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    });
    return $scope.reply = function() {
      var message, msg_id, notify;
      msg_id = Math.floor((Math.random() * 90000) + 10000);
      message = {
        message_id: msg_id,
        sender: $rootScope.current_user.username,
        receiver: $scope.message.sender,
        message: $scope.text_message,
        status: 0,
        url: '#/messages/' + msg_id,
        reply_to: $scope.message
      };
      notify = {
        sender: $rootScope.current_user.username,
        receiver: $scope.message.sender,
        content: $rootScope.current_user.username + ' ได้ตอบกลับข้อความของคุณ',
        status: 0,
        url: '#/messages/' + msg_id
      };
      $http.post('http://localhost/messages', message).success(function(data) {
        alert('ตอบข้อความเรียบร้อยแล้ว');
        return $scope.text_message = '';
      });
      $http.post('http://localhost/notifications', notify);
      return false;
    };
  });

}).call(this);

/*
//@ sourceMappingURL=read-message.js.map
*/
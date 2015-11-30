(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('profileDetail', function($http, $rootScope) {
    return {
      templateUrl: 'views/pages/profile-detail.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.openBadgesContainer = function() {
          var b, _i, _len, _ref;
          angular.element('.all-badges-container').show();
          _ref = scope.user.show_badges;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            b = _ref[_i];
            angular.element('#badge' + b.id).addClass('selected-badge');
          }
          return false;
        };
        scope.showBadgeDetail = function(id) {
          angular.element('#details-of-' + id).openModal();
          return false;
        };
        scope.showTooltip = function() {
          angular.element('.tooltipped').tooltip({
            delay: 50
          });
          return false;
        };
        return scope.sendMessage = function() {
          var message, msg_id, notify;
          msg_id = Math.floor((Math.random() * 90000) + 10000);
          message = {
            message_id: msg_id,
            sender: $rootScope.current_user.username,
            receiver: scope.user.username,
            message: scope.text_message,
            status: 0,
            url: '#/messages/' + msg_id
          };
          notify = {
            sender: $rootScope.current_user.username,
            receiver: scope.user.username,
            content: $rootScope.current_user.username + ' ได้ส่งข้อความถึงคุณ',
            status: 0,
            url: '#/messages/' + msg_id
          };
          $http.post('http://localhost/messages', message).success(function(data) {
            alert('ส่งข้อความเรียบร้อยแล้ว');
            return scope.text_message = '';
          });
          $http.post('http://localhost/notifications', notify);
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=profile-detail.js.map
*/
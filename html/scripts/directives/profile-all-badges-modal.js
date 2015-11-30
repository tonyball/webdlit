(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('profileAllBadgesModal', function() {
    return {
      templateUrl: 'views/pages/profile-all-badges-modal.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        return angular.element('.all-badges-container').hide();
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=profile-all-badges-modal.js.map
*/
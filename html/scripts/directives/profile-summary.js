(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('profileSummary', function() {
    return {
      templateUrl: 'views/pages/profile-summary.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        var switchCard;
        scope.showAllBadges = function() {
          angular.element('#all-badges-modal').openModal();
          return false;
        };
        switchCard = function(card) {
          angular.element('.data-card').removeClass('fadeIn');
          angular.element('.data-card').addClass('fadeOut').hide();
          angular.element(card).removeClass('fadeOut');
          angular.element(card).addClass('fadeIn').show();
          return false;
        };
        angular.element('.action-btn').on('click', function() {
          angular.element('.action-btn').addClass('black-text btn-flat');
          angular.element('.action-btn').removeClass('white-text btn orange');
          angular.element(this).removeClass('black-text btn-flat');
          angular.element(this).addClass('white-text btn orange');
          switchCard('.' + angular.element(this).attr('data-value'));
          return false;
        });
        return angular.element('select').on('change', function() {
          switchCard('.' + angular.element(this).val());
          return false;
        });
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=profile-summary.js.map
*/
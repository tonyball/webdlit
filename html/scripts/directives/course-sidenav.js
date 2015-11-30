(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseSidenav', function($location) {
    return {
      templateUrl: 'views/pages/course-sidenav.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.hideNav = function() {
          angular.element('#open-classroom-sidenav').show();
          angular.element('.classroom-sidenav-container').hide();
          angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12');
          return false;
        };
        scope.showContent = function(event, content_id) {
          var cont, _i, _len, _ref;
          scope.check_answers = [];
          scope.submit_answer = [];
          $location.search('id', content_id);
          scope.current_content = content_id;
          _ref = scope.contents;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cont = _ref[_i];
            if (cont.id === scope.current_content) {
              scope.content = cont;
              break;
            }
          }
          angular.element('html, body').animate({
            scrollTop: 0
          }, 500);
          scope.current_section = scope.content.section_name;
          scope.switchContent('.' + angular.element(event.target).attr('data-type') + '-container', angular.element(event.target).attr('data-type'), angular.element(event.target).attr('data-href'), angular.element(event.target).attr('data-title'), content_id);
          return false;
        };
        return scope.showContents = function() {
          angular.element('.collapsible').collapsible({
            accordion: false
          });
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-sidenav.js.map
*/
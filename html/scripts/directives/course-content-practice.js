(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseContentPractice', function() {
    return {
      templateUrl: 'views/pages/course-content-practice.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        var toRender;
        scope.hideAns = function() {
          angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12');
          angular.element('.answer-container').removeClass('s12 m3');
          angular.element('#open-practice-answer-sheet').show();
          angular.element('#practice-item-pdf,#test-item,#practice-item-img').removeClass('m9 s12');
          angular.element('.answer-test-container,.answer-container,.answer-container-action').hide();
          return false;
        };
        scope.showGuide = function() {
          angular.element('#special-input-panel').show();
          return false;
        };
        scope.showPanel = function(event) {
          scope.last_focus = event.target;
          scope.demoSource = document.querySelector('#' + event.target.id);
          scope.demoRendering = document.querySelector('#' + event.target.id + '-rendered');
          toRender();
          return false;
        };
        return toRender = function() {
          var math;
          MathJax.Hub.Configured();
          math = null;
          MathJax.Hub.Queue(function() {
            math = MathJax.Hub.getAllJax(scope.last_focus.id + '-rendered')[0];
            scope.demoSource.addEventListener('input', function() {
              MathJax.Hub.Queue(['Text', math, scope.demoSource.value]);
            });
          });
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-content-practice.js.map
*/
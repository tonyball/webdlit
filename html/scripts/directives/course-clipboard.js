(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('courseClipboard', function() {
    return {
      templateUrl: 'views/pages/course-clipboard.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.undo = function() {
          return scope.version--;
        };
        scope.clear = function() {
          angular.element('#SketchPad').trigger('click');
          return false;
        };
        scope.showClipboard = function() {
          angular.element('#draw-clipboard-modal').show();
          return false;
        };
        scope.hideClipboard = function() {
          angular.element('#draw-clipboard-modal').hide();
          return false;
        };
        scope.closeTextClipboard = function() {
          angular.element('#text-clipboard-modal').closeModal();
          return false;
        };
        angular.element('#SketchPad').sketch();
        return angular.element('.tooltipped').tooltip({
          delay: 50
        });
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=course-clipboard.js.map
*/
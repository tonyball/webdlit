(function() {
  'use strict';
  angular.module('newkruDlitApp').directive('classroomNewContentForm', function() {
    return {
      templateUrl: 'views/pages/classroom-new-content-form.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.addAnswer = function(content) {
          var i, _i, _ref;
          content.answer_of_question = [];
          for (i = _i = 0, _ref = content.number_of_question - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            content.answer_of_question.push('');
          }
          return false;
        };
        scope.addContent = function(section) {
          section.contents.push({
            id: scope.i_content,
            title: "",
            type: "",
            slide: "",
            logo: "",
            content_url: "",
            not_start: [],
            started: [],
            complete: [],
            remark: "",
            extended_remark: [],
            caption: [],
            number_of_question: "",
            answer_of_question: [],
            answer_type: ""
          });
          scope.i_content++;
          return false;
        };
        scope.removeContent = function(section) {
          section.contents.pop();
          scope.i_content--;
          return false;
        };
        return scope.setLogo = function(content) {
          if (content.type === 'video') {
            content.logo = 'fa-film';
          } else if (content.type === 'practice') {
            content.logo = 'fa-pencil-square-o';
          } else if (content.type === 'test') {
            content.logo = 'fa-file-pdf-o';
          }
          return false;
        };
      }
    };
  });

}).call(this);

/*
//@ sourceMappingURL=classroom-new-content-form.js.map
*/
'use strict'

angular.module('newkruDlitApp')
  .directive('classroomNewContentForm', ->
    templateUrl: 'views/pages/classroom-new-content-form.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
    	scope.addAnswer = (content)->
    		content.answer_of_question = []
    		for i in [0..content.number_of_question-1]
    			content.answer_of_question.push ''
    		return false
    	scope.addContent = (section) ->
    		section.contents.push({id:scope.i_content,title:"",type:"",slide:"",logo:"",content_url:"",not_start:[],started:[],complete:[],remark:"",extended_remark:[],caption:[],number_of_question:"",answer_of_question:[],answer_type:""})
    		scope.i_content++
    		return false
    	scope.removeContent = (section) ->
            section.contents.pop()
            scope.i_content--
            return false
        scope.setLogo = (content) ->
            if content.type == 'video'
                content.logo = 'fa-film'
            else if content.type == 'practice'
                content.logo = 'fa-pencil-square-o'
            else if content.type == 'test'
                content.logo = 'fa-file-pdf-o'
            return false
  )

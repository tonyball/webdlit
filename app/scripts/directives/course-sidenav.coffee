'use strict'

angular.module('newkruDlitApp')
  .directive('courseSidenav', ($location)->
    templateUrl: 'views/pages/course-sidenav.html'
    restrict: 'E'
    link: (scope, element, attrs) ->
        scope.hideNav = ->
            angular.element('#open-classroom-sidenav').show()
            angular.element('.classroom-sidenav-container').hide()
            angular.element('.main-content-container').removeClass('m9 s12').addClass('m12 s12')
            return false
        scope.showContent = (event,content_id) ->
            scope.check_answers = []
            scope.submit_answer = []
            $location.search('id',content_id)
            scope.current_content = content_id
            for cont in scope.contents
                if cont.id == scope.current_content
                    scope.content = cont
                    break
            angular.element('html, body').animate { scrollTop: 0}, 500
            scope.current_section = scope.content.section_name
            if angular.element(event.target).attr('data-type') == 'video'
              scope.switchContent '.' + angular.element(event.target).attr('data-type') + '-container', angular.element(event.target).attr('data-type'), angular.element(event.target).attr('data-video-url'), angular.element(event.target).attr('data-title'), content_id
            else
              scope.switchContent '.' + angular.element(event.target).attr('data-type') + '-container', angular.element(event.target).attr('data-type'), angular.element(event.target).attr('data-href'), angular.element(event.target).attr('data-title'), content_id
            return false
        scope.showContents = ->
            angular.element('.collapsible').collapsible accordion: false
            return false
  )

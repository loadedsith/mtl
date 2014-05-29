
angular.module('mtlApp.directives', [])
  .directive('mtlVideoPlayer', function ($interval) {
    'use strict';
    return {
      scope:{
        frames:"=mtlFrames"
      },
      link: function postLink(scope, element, attrs) {

        scope.updateFrame = function (count) {

          // console.log('scope.frames',scope.frames);                  
          $(element).css({'background-image':'url('+scope.frames[count%scope.frames.length]+')'});
          
        };
        scope.timer = $interval(scope.updateFrame, 1000);
          $(element).css({'background-image':'url(http://placehold.it/300x300/?=Test)'});
        console.log('attrs.frames||attrs', attrs.frames||attrs);
      },
      restrict: 'A'
    };
  });

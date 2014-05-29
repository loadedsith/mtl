angular.module('mtlApp.directives', [])
  .directive('mtlVideoPlayer', function ($interval) {
    'use strict';
    return {
      templateUrl:'views/videoPlayer.html',
      scope:{
        frames:"=mtlFrames"
      },
      link: function postLink(scope, element, attrs) {
        scope.yOffset = 0;
        
        scope.canvas = $(element).find('#frame')[0];
        console.log('canvas', scope.canvas);
        scope.context = scope.canvas.getContext("2d");
        scope.drawToCanvasFrames = [];
        
        for (var i = scope.frames.length - 1; i >= 0; i--) {
          var frame = scope.frames[i];
          var newImage = new Image();
          newImage.onload = function (a,b,c) {
            console.log('scope.imagesCanvas', this.width);
            scope.context.drawImage(this,scope.yOffset,0);
            scope.yOffset += this.width;
          };
          newImage.src = frame;
          scope.drawToCanvasFrames.push(newImage);
        }
        
        // context.drawImage(img,10,10);
        scope.count = 0;
        scope.updateFrame = function () {
          // console.log('scope.frames',scope.frames);                  
          // $(element).find('#frame').attr({'src': scope.frames[scope.count%scope.frames.length]});
          console.log('scope.drawToCanvasFrames.length', scope.drawToCanvasFrames.length);
          if (scope.drawToCanvasFrames.length > 0) {
            console.log('scope.drawToCanvasFrames', scope.drawToCanvasFrames);
            scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.context.canvas.width, scope.context.canvas.height);
            scope.count++;
          }
        };
        scope.timer = $interval(scope.updateFrame, 1000);
        // $(element).find('#frame').attr({'src': 'http://placehold.it/300x300/?=Test'});
        
        console.log('attrs.frames||attrs', attrs.frames||attrs);
      },
      restrict: 'A'
    };
  });
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
        scope.getFrames = function (results) {
          var frames = [];
          console.log('results.statuses[0]', results.statuses[0]);
          for (var i = results.statuses.length - 1; i >= 0; i--) {
            results.statuses[i];
            if (results.statuses[i].entities !== undefined) {
              if (results.statuses[i].entities.media !== undefined){
                console.log('results.statuses[i].entities.media[0][\'media_url\']', results.statuses[i].entities.media[0]['media_url']);
                frames.push(results.statuses[i].entities.media[0]['media_url']);
              }
            } else {

            }
          }
      
          return frames;
        }
        scope.canvas = $(element).find('#frame')[0];
        // console.log('canvas', scope.canvas);
        scope.context = scope.canvas.getContext("2d");
        scope.drawToCanvasFrames = [];
        
        for (var i = scope.frames.length - 1; i >= 0; i--) {
          var frame = scope.frames[i];
          var newImage = new Image();
          newImage.onload = function (a,b,c) {
            // console.log('scope.imagesCanvas', this.width);
            scope.context.drawImage(this,scope.yOffset,0);
            scope.yOffset += this.width;
          };
          newImage.src = frame;
          scope.drawToCanvasFrames.push(newImage);
        }
        
        // context.drawImage(img,10,10);
        scope.count = 0;
        scope.updateFrame = function () {
          if (scope.drawToCanvasFrames.length > 0) {
            scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.context.canvas.width, scope.context.canvas.height);
            scope.count++;
          }
        };
        scope.timer = $interval(scope.updateFrame, 200);
        scope.$on('updateHashtag', function(event,data) {
          console.log('data', data);
          console.log('excited Yellow-banded Dart frog');
          scope.frames = scope.getFrames(data.results);
          console.log('scope.frames', scope.frames);
          scope.yOffset = 0;
        
          scope.canvas = $(element).find('#frame')[0];
          scope.context = scope.canvas.getContext("2d");
          scope.drawToCanvasFrames = [];
        
          for (var i = scope.frames.length - 1; i >= 0; i--) {
            var frame = scope.frames[i];
            if (! (frame in scope.drawToCanvasFrames)){
              //is it a unique frame
              var newImage = new Image();
              newImage.onload = function (a,b,c) {
                scope.context.drawImage(this, scope.yOffset, 0);
                scope.yOffset += this.width;
              };
              newImage.src = frame;
              scope.drawToCanvasFrames.push(newImage);
              
            }
          }
          scope.count = 0;
          scope.updateFrame = function () {
            if (scope.drawToCanvasFrames.length > 0) {
              scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.context.canvas.width, scope.context.canvas.height);
              scope.count++;
            }
          };
        });
        console.log('attrs.frames||attrs', attrs.frames||attrs);
      },
      restrict: 'A'
    };
  });
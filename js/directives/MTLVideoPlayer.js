angular.module('mtlApp.directives', [])
  .directive('mtlVideoPlayer', function ($interval) {
    'use strict';
    return {
      templateUrl:'views/videoPlayer.html',
      scope:{
        frames:"=mtlFrames"
      },
      link: function postLink(scope, element, attrs) {
        scope.speeds = [
          {name:'1', ms: 1000},
          {name:'2', ms: 500},
          {name:'3', ms: 333},
          {name:'4', ms: 250},
          {name:'5', ms: 200},
          {name:'6', ms: 166},
          {name:'7', ms: 142},
          {name:'8', ms: 125},
          {name:'9', ms: 111},
          {name:'10', ms: 100},
          {name:'15', ms: 150},
          {name:'20', ms: 50}
        ];
        scope.speed = scope.speeds[3];
        scope.yOffset = 0;
        scope.getFrames = function (results) {
          var frames = [];
          console.log('results.statuses[0]', results.statuses[0]);
          for (var i = results.statuses.length - 1; i >= 0; i--) {
            results.statuses[i];
            if (results.statuses[i].entities !== undefined) {
                console.log('results.statuses[i].entities',results.statuses[i].entities);
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
        scope.calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

          var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

          return { width: srcWidth*ratio, height: srcHeight*ratio };
       }
        scope.count = 0;
        scope.updateFrame = function () {
          if (scope.drawToCanvasFrames.length > 0) {
            scope.context.canvas.width = angular.element(element).width();
            scope.context.canvas.height = angular.element(document.body).height();
            console.log('scope.context.canvas.width', scope.context.canvas.width);
            console.log('scope.context.canvas.height', scope.context.canvas.height);
            var size = scope.calculateAspectRatioFit(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length].width, scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length].height, scope.context.canvas.width, scope.context.canvas.height);
            // console.log('scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length]', scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length].width);
            // scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length].width, scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length].height);
            scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, size.width, size.height);
            // scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.context.canvas.width, scope.context.canvas.height);
            scope.count++;
          }
        };
        scope.$watch('speed',function () {
          $interval.cancel(scope.timer);
          console.log('scope.speed.ms', scope.speed.ms);
          scope.timer = $interval(scope.updateFrame, scope.speed.ms||200);
        });
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
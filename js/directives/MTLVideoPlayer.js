angular.module('mtlApp.directives', [])
  .directive('mtlVideoPlayer', function ($interval, $cookies, $filter) {
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
        scope.hasFrames = false;
        scope.percent = 1;
        scope.yOffset = 0;
        scope.loading = false;
        
  
        scope.meter = function ($event) {
          scope.count = Math.floor(  ( $event.offsetX / angular.element($event.toElement).width() ) * scope.frames.length);
        };
  
        
        if ($cookies.speed !== undefined) {
          for (var i = scope.speeds.length - 1; i >= 0; i--) {
            if (Number($cookies.speed) === Number(scope.speeds[i].ms)) {
              console.log('scope.speed = scope.speeds[i];', scope.speed , scope.speeds[i]);
              scope.speed = scope.speeds[i];
            }
          }
        } 
        if (scope.speed === undefined) {
          scope.speed = scope.speeds[3];
        }
        
        scope.$watch('speed',function () {
          $cookies.speed = scope.speed.ms;
        });
        
        scope.getFrames = function (results) {
          var frames = [];
          for (var i = results[0].statuses.length - 1; i >= 0; i--) {
            // results.statuses[i];
            if (results[0].statuses[i].entities !== undefined) {
              if (results[0].statuses[i].entities.media !== undefined){
                console.log('date',results[0].statuses[i].created_at);
                frames.push({
                  url:results[0].statuses[i].entities.media[0]['media_url'],
                  offsetX:0,
                  offsetY:100,
                  date:new Date(results[0].statuses[i].created_at)
                  });
                //console.log('26',scope.frames[26].date);
                //console.log('26-',new Date(scope.frames[26].date));
                
              }
            }
          }
          console.log(results)
          if( results[1].length > 0 ){
            for (var imageI = results[1].length - 1; imageI >= 0; imageI--) {
              if (results[1][imageI].images !== undefined) {
  //            console.log('30',scope.frames[30].date);
    //          console.log('30',new Date(scope.frames[30].date * 1000));
                frames.push({
                  url:results[1][imageI].images.standard_resolution.url,
                  offsetX:0,
                  offsetY:100,
                  date:new Date(results[1][imageI].created_time * 1000)
                  });
              }
            }  
          }
          
          return scope.sortFramesByDate(frames);
        }
        
        scope.canvas = $(element).find('#frame')[0];
        
        scope.context = scope.canvas.getContext("2d");
        
        scope.drawToCanvasFrames = [];
        
        scope.count = 0;
        // context.drawImage(img,10,10);
        scope.calculateAspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

          var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

          return { width: srcWidth*ratio, height: srcHeight*ratio };
        }
        scope.sortFramesByDate = function (frames) {
          var sortedFrames;
          //console.log('26',scope.frames[26].date);
          //console.log('30',scope.frames[30].date);
          //console.log('26-',new Date(scope.frames[26].date));
          //console.log('30',new Date(scope.frames[30].date * 1000));
          sortedFrames = $filter('orderBy')(frames, 'date');
          return sortedFrames;
        };
        scope.updateFrame = function () {
          if (scope.drawToCanvasFrames.length > 0) {
            scope.context.canvas.width = angular.element(element).width();
            scope.context.canvas.height = angular.element(document.body).height();
            var image = scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length];
            var size = scope.calculateAspectRatioFit(image.width, image.height, scope.context.canvas.width, scope.context.canvas.height);
            var top = 0;
            var left = 0;
            var topOffset = scope.frames[scope.count % scope.frames.length].offsetY||0;
            var leftOffset = scope.frames[scope.count % scope.frames.length].offsetX||0;
            
            if (size.height <= size.width) {
              // centering = "height"
              top = scope.context.canvas.height / 2 - size.height / 2;

            } else {
              left = scope.context.canvas.width / 2 - size.width / 2;
              // topOffset = size.width / 2 * -1;

            }
            scope.percent = (scope.count % scope.drawToCanvasFrames.length) / scope.drawToCanvasFrames.length * 100;
            scope.context.drawImage(image, left + leftOffset, top + topOffset, size.width, size.height);
            scope.count++;
          }
        };

        // scope.updateFrame = function () {
        //   if (scope.drawToCanvasFrames.length > 0) {
        //     scope.context.drawImage(scope.drawToCanvasFrames[scope.count % scope.drawToCanvasFrames.length], 0, 0, scope.context.canvas.width, scope.context.canvas.height);
        //     scope.count++;
        //   }
        // };


        scope.$watch('playing',function () {
          scope.play();
        });
        scope.$watch('speed',function () {
          scope.play();
        });
        
        scope.play = function () {
          if( scope.timer !== undefined) {
            $interval.cancel(scope.timer);
          }
          if (scope.playing === true) {
            scope.timer = $interval(scope.updateFrame, scope.speed.ms||200);              
          }
        };


        
        scope.$on('updateHashtag', function(event,data) {
          scope.loading = true;
          scope.frames = scope.getFrames(data.results);
          scope.yOffset = 0;
        
          scope.canvas = $(element).find('#frame')[0];
          scope.context = scope.canvas.getContext("2d");
          scope.drawToCanvasFrames = [];
          if (scope.frames.length > 0){
            scope.hasFrames = true;
          }else{
            scope.hasFrames = false;
          }
          
          for (var i = scope.frames.length - 1; i >= 0; i--) {
            var frame = scope.frames[i];
            if (! (frame in scope.drawToCanvasFrames)){
              //is it a unique frame
              var newImage = new Image();
              newImage.onload = function (a,b,c) {
                scope.drawToCanvasFrames.push(this);
                if (scope.drawToCanvasFrames.length === scope.frames.length ){
                  scope.loading = false;
                  scope.playing = true;
                  scope.play();
                }
              };
              newImage.src = frame.url;
            }
          }
          scope.count = 0;
        });
        console.log('attrs.frames||attrs', attrs.frames||attrs);
      },
      restrict: 'A'
    };
  });
'use strict';

angular.module('mtlApp')
  .controller('MainCtrl', function ($scope, FramesService) {
    $scope.templates = {
      'video':'views/video.html',
      'search':'views/search.html'
    }
    $scope.search = function (hashtag) {
      console.log('itchy Painted Hunting Dog',hashtag);
      if (hashtag !== undefined) {
        FramesService.hashtagSearch(hashtag);
      }
    }
    $scope.debug = "test";
    $scope.frames = [
      'placeholders/birdDogging.png', 'placeholders/bubble.png', 'placeholders/castle.png', 'placeholders/cloudsRollingOff.png', 'placeholders/fire.png', 'placeholders/goldenGate.png', 'placeholders/hotair.png', 'placeholders/leopard.png', 'placeholders/solitaryCloud.png', 'placeholders/street.png', 'placeholders/tennis.png', 'placeholders/trees.png', 'placeholders/treesRoad.jpeg'
    ];
    $scope.getFrames = function (results) {
      var frames = [];
      console.log('results.statuses[0]', results.statuses[0]);
      for (var i = results.statuses.length - 1; i >= 0; i--) {
        results.statuses[i];
        if (results.statuses[i].entities !== undefined) {
          if (results.statuses[i].entities.media !== undefined){
            console.log('gotMedia: status.entities.media', results.statuses[i].entities.media);
            frames.push(results.statuses[i].entities.media['media_url']);
          }
        } else {

        }
      }
      
      return frames;
    }
    $scope.$on('updateHashtag',function (event,data,c) {
      // $scope.frames = $scope.getFrames(data.results)
    });
  });

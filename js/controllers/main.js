'use strict';

angular.module('mtlApp')
  .controller('MainCtrl', function ($scope, FramesService) {
    $scope.templates = {
      'video':'views/video.html',
      'search':'views/search.html'
    }
    $scope.search = function (hashtag) {
      if (hashtag === undefined) {
        FramesService.hashtagSearch(hashtag);
      }
    }
    $scope.debug = "test";
    $scope.frames = [
      'placeholders/birdDogging.png', 'placeholders/bubble.png', 'placeholders/castle.png', 'placeholders/cloudsRollingOff.png', 'placeholders/fire.png', 'placeholders/goldenGate.png', 'placeholders/hotair.png', 'placeholders/leopard.png', 'placeholders/solitaryCloud.png', 'placeholders/street.png', 'placeholders/tennis.png', 'placeholders/trees.png', 'placeholders/treesRoad.jpeg'
    ];
  });

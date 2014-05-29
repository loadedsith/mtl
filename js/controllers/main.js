'use strict';

angular.module('mtlApp')
  .controller('MainCtrl', function ($scope) {
    $scope.templates = {
      'video':'views/video.html'
    }
    $scope.debug = "test";
    $scope.frames = [
      'placeholders/birdDogging.png', 'placeholders/bubble.png', 'placeholders/castle.png', 'placeholders/cloudsRollingOff.png', 'placeholders/fire.png', 'placeholders/goldenGate.png', 'placeholders/hotair.png', 'placeholders/leopard.png', 'placeholders/solitaryCloud.png', 'placeholders/street.png', 'placeholders/tennis.png', 'placeholders/trees.png', 'placeholders/treesRoad.jpeg'
    ];
  });

'use strict';

angular.module('mtlApp')
  .controller('MainCtrl', function ($scope, FramesService, $timeout, $cookies, $location) {
    $scope.templates = {
      'video':'views/video.html',
      'search':'views/search.html',
      'controls':'views/controls.html'
    }
    $scope.host = window.location.host;
    
    if ($cookies.drawerOpen !== true) {
      $scope.drawerOpen = true;
    } else {
      $scope.drawerOpen = false;
    }
    $scope.$watch('drawerOpen', function () {
      console.log('Smarty rabbit');
      $cookies.drawerOpen = $scope.drawerOpen;
    });
    
    $scope.search = function (hashtag) {
      if (hashtag !== undefined) {
        FramesService.hashtagSearch(hashtag);
        FramesService.loading = true;
      }
      $scope.drawerOpen = false;
    }
    $scope.debug = "test";
  });

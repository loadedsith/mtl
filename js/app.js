var app = angular.module('mtlApp', ['ngRoute' , 'ngResource', 'ui', 'mtlApp.directives'])//  'ngAnimate', 'ui'    'ngCookies', 'ngSanitize',
  .config(function ($routeProvider) {
    'use strict';

    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
// 
// var debug = '/* @echo DEBUG */';
// if (debug === '' || debug === 'false') {
//   debug = false;
// } else {
//   debug = true;
// }

// app.constant('DEBUG', debug || false);

// $(document).foundation();

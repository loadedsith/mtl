var app = angular.module('mtlApp', ['ngRoute' , 'ngResource', 'ui', 'mtlApp.directives', 'UserApp' ])// 'ngAnimate', 'ui'    'ngCookies', 'ngSanitize',
  .config(function ($routeProvider, $locationProvider) {
    'use strict';
    // $locationProvider.html5Mode(true)
    $routeProvider
      .when('/home', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        public: false
      })
      .when('/login', {templateUrl: 'views/login.html', login: true, controller: 'MainCtrl'})
      .when('/signup', {templateUrl: 'views/signup.html', public: true, controller: 'MainCtrl'})
      .otherwise({
        redirectTo: '/home'
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

app.run(function($rootScope, user) {
  user.init({ appId: '52e1ce7391e02' });
});


$(document).foundation();

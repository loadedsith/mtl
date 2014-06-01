var app = angular.module('mtlApp', ['ngRoute' , 'ngResource', 'ui', 'mtlApp.directives', 'UserApp'])//  'ngAnimate', 'ui'    'ngCookies', 'ngSanitize',
  .config(function ($routeProvider) {
    'use strict';

    $routeProvider
      .when('/home', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {templateUrl: 'views/login.html', login: true})
      .when('/signup', {templateUrl: 'views/signup.html', public: true})
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
app.run(function(user) {
	user.init({ appId: '52e1ce7391e02' });
});


$(document).foundation();

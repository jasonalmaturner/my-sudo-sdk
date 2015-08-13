var app = angular.module('sdk', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home/homeTmpl.html',
      controller: 'homeCtrl'
    })
    .when('/addBird', {
      templateUrl: 'app/views/addBird/addBirdTmpl.html',
      controller: 'addBirdCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });

});

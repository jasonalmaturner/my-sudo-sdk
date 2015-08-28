var app = angular.module('sdk');

app.controller('mainCtrl', function($scope, mainService){

  var authObj = mainService.getAuth();

  authObj.$onAuth(function(user){
    console.log(user);
    if(user && user.password){
      $scope.user = user.password;
    } else if (user && user.facebook){
      $scope.user = user.facebook;
    } else {
      $scope.user = user;
    }
  });

});

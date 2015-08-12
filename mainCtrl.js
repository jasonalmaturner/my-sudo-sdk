var app = angular.module('sdk');

app.controller('mainCtrl', function($scope, mainService){
  // $scope.getBirds = function(){
  //   mainService.getBirds($scope.order, $scope.status).then(function(res){
  //     $scope.birds = res;
  //   }, function(err){
  //     console.log(err);
  //   });
  // };

  $scope.getBirds = function(){
    mainService.mySDK($scope.order, $scope.status, function(err, birds){
      if(err){
        console.log(err);
      } else {
        $scope.birds = birds;
      };
    });
  };

})

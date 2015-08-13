var app = angular.module('sdk');

app.controller('addBirdCtrl', function($scope, mainService){

  $scope.addBird = function(){
      mainService.createBird($scope.newBird).then(function(res){
        alert($scope.newBird.scientificName + ' created');
        $scope.newBird = '';
      }, function(err){
        console.log(err);
      })
  };

})

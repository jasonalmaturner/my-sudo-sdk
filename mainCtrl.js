var app = angular.module('sdk');

app.controller('mainCtrl', function($scope, mainService){
  $scope.err = false;
  $scope.IUCNCategories = ["all", "lc", "nt", "vu", "en", "cr", "cr (pe)", "cr (pew)", "ew", "ex", "dd", "nr", "ur"]

  $scope.getBirdsSansSDK = function(){
    if($scope.status === 'all'){
      $scope.status = false;
    };
    mainService.getBirds($scope.order, $scope.status).then(function(res){
      $scope.birds = res;
      $scope.err = false;
    }, function(err){
      console.log(err);
      $scope.err = 'No birds found';
      $scope.birds = [];
    });
  };

  $scope.getBirdsSDK = function(){
    if($scope.status === 'all'){
      $scope.status = false;
    };
    console.log($scope.status)
    mainService.mySDK($scope.order, $scope.status, function(err, birds){
      if(err){
        console.log(err);
        $scope.err = 'No birds found';
        $scope.birds = [];
      } else {
        $scope.err = false;
        $scope.birds = birds;
      };
    });
  };

})

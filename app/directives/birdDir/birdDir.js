var app = angular.module('sdk');

app.directive('birdDir', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/birdDir/birdDir.html',
    scope: {
      bird: '=',
      removeBird: '&'
    },
    link: function(scope, elem, attr){

    },
    controller: function($scope, mainService){
      $scope.edit = false;

      $scope.toggleEdit = function(){
        console.log('clicked');
        $scope.edit = !$scope.edit;
      };

      $scope.editBird = function(){
        mainService.editBird($scope.bird).then(function(res){
          $scope.bird = res;
          $scope.edit = false;
        }, function(err){
          console.log(err);
        });
      };

      $scope.deleteTheBird = function(){
        console.log($scope.bird._id);
        $scope.removeBird({id: $scope.bird._id});
      };
    }
  };
});

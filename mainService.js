var app = angular.module('sdk');

app.service('mainService', function($http, $q){

  this.getBirds = function(order, status){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: 'http://bird-api.com/api/birds?order=' + order + '&IUCNRedListCategory2014=' + status
    }).then(function(res){
      dfd.resolve(res.data);
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.mySDK = function(order, status, cb){
    $http({
      method: 'GET',
      url: 'http://bird-api.com/api/birds?order=' + order + '&IUCNRedListCategory2014=' + status
    }).then(function(res){
      cb(null, res.data);
    }, function(err){
      cb(err, null);
    });
  };

});

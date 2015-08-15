var app = angular.module('sdk');

app.service('mainService', function($http, $q, $firebaseAuth, $firebaseObject){

  var ref = new Firebase('https://bird-api.firebaseio.com');
  var authObject = $firebaseAuth(ref);

  this.getBirds = function(order, status){
    var category = status ? 'IUCNRedListCategory2014=' + status : '';
    var theOrder = order ? 'order=' + order : '';
    var and = status && order ? '&' : '';
    var url = 'http://bird-api.com/api/birds?' + theOrder + and + category
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: url
    }).then(function(res){
      dfd.resolve(res.data);
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.mySDK = function(order, status, cb){
    var category = status ? 'IUCNRedListCategory2014=' + status : '';
    var theOrder = order ? 'order=' + order : '';
    var and = status && order ? '&' : '';
    var url = 'http://bird-api.com/api/birds?' + theOrder + and + category
    $http({
      method: 'GET',
      url: url
    }).then(function(res){
      cb(null, res.data);
    }, function(err){
      cb(err, null);
    });
  };

  this.editBird = function(bird){
    var dfd = $q.defer();
    $http({
      method: 'PUT',
      url: 'http://bird-api.com/api/birds/' + bird._id,
      data: bird
    }).then(function(res){
      dfd.resolve(res.data);
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.deleteBird = function(id){
    console.log(id);
    return $http({
      method: 'DELETE',
      url: 'http://bird-api.com/api/birds/' + id
    });
  };

  this.createBird = function(bird){
    return $http({
      method: 'POST',
      url: 'http://bird-api.com/api/birds',
      data: bird
    });
  };

  this.register = function(user){
    var dfd = $q.defer();
    authObject.$createUser({
      email: user.email,
      password: user.password
    }).then(function(authData){
      var id = authData.uid.replace('simplelogin:', '');
      var userRef = new Firebase('https://bird-api.firebaseio.com/users/' + id);
      var userObj = $firebaseObject(userRef);
      userObj.email = user.email;
      // userObj.profileImageURL = authData.password.profileImageURL;
      userObj.$save().then(function(res){
        console.log(res);
        authObject.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(loggedInUser){
          console.log(loggedInUser);
          dfd.resolve(loggedInUser);
        }, function(error){
          dfd.reject(error);
        });
      }, function(err){
        dfd.reject(err);
      });
    }, function(err){
      dfd.reject(err);
    });
    return dfd.promise;
  };

  this.login = function(user){
    authObject.$authWithPassword({
      email: user.email,
      password: user.password
    });
  };

  this.facebookLogin = function(){
    authObject.$authWithOAuthPopup('facebook').then(function(authData){
      var id = authData.uid.replace('facebook:', '');
      var userRef = new Firebase('https://bird-api.firebaseio.com/users/' + id);
      var userObj = $firebaseObject(userRef);
      console.log(userObj, authData)
      userObj.facebookid = authData.facebook.id;
      userObj.name = authData.facebook.displayName;
      userObj.$save().then(function(user){
        console.log(user);
      }, function(err){
        console.log(err);
      });
      console.log(authData);
    }, function(err){
      console.log(err);
    });
  }

  this.getAuth = function(){
    return authObject;
  };

});

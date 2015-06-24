'use strict';

/**
 * @ngdoc overview
 * @name childSponsorshipWebApp
 * @description
 * # childSponsorshipWebApp
 * Authentication Factory
 */

angular.module('childSponsorshipWebApp')
  .factory('authService', function ($rootScope, $location, $q, apiService) {

    var authenticate = function(path, email, password) {
      apiService.post( path, { email: email, password: password } )
      .success( function (data, status, headers, config) {
        localStorage.setItem('api-token', data.token);
        apiService.get('/user')
        .success( function (data, status, headers, config) {
          user = data;
          localStorage.setItem('email', user.email);
          localStorage.setItem('access', user.access);
          // $location.path(localStorage.getItem('post-login-path') || '/home').replace();
          $rootScope.$broadcast("login.success");
        });
      })
      .error( function(data, status, error) {
        alert('error: ' + status);
        $rootScope.$broadcast("login.failed", error);
      });
    };

    var routeIsAccessible = function() {
      if( accessRequired === undefined || accessRequired == null || accessRequired == 0 ) {
        return true;
      } else {
        return(
          localStorage.getItem('access') !== undefined &&
          localStorage.getItem('access') >= accessRequired
        );
      }
    };

    var user;

    var logout = function() {
      apiService.get('/logout');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('access');
      localStorage.removeItem('api-token');
      $rootScope.$broadcast("logout.success");
    };

    var login = function(email, password) {
      authenticate('/login', email, password);
    };

    var signup = function(email, password) {
      authenticate('/signup', email, password).then(function () {
        $rootScope.$broadcast("login.success");
      }, function (error) {
        $rootScope.$broadcast("login.failed", error);
      })
    };

    var email = function() {
      return localStorage.getItem('email');
    };

    var isLoggedIn = function() {
      return !! email();
    };

    var isAdmin = function() {
      if (localStorage.getItem('access') > 5) {
        return true;
      }
      return false;
    };

    var isAuthorized = function() {
      if (isLoggedIn()) { return true; }
      return $q.reject('Not Authorized');
    };

    var currentUser = function() {
      if (user == undefined) {
        apiService.get('/user')
        .success(function (data, status, headers, config) {
          user = data;
          $rootScope.$broadcast("user.success");
        });
      }
      return user;
    };

  return {
    routeIsAccessible: routeIsAccessible,
    login:        login,
    signup:       signup,
    email:        email,
    isLoggedIn:   isLoggedIn,
    isAdmin:      isAdmin,
    logout:       logout,
    isAuthorized: isAuthorized,
    currentUser:  currentUser
  };
});

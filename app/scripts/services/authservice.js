'use strict';

/**
 * @ngdoc overview
 * @name childSponsorshipWebApp
 * @description
 * # childSponsorshipWebApp
 * Authentication Factory
 */

angular.module('childSponsorshipWebApp')
  .factory('authService', ['$window', '$location', 'apiService', function($window, $location, apiService) {

  return {
    routeIsAccessible: function(accessRequired) {
      if( accessRequired === undefined || accessRequired == null || accessRequired == 0 ) {
        return true;
      } else {
        return(
          localStorage.getItem('access') !== undefined &&
          localStorage.getItem('access') >= accessRequired
        );
      }
    },
    checkCredentials: function(email, password) {
      console.log(email)
      console.log(password)
      apiService.post( '/tokens', { email: email, password: password } )
      .success( function(data, status, headers, config) {
        localStorage.setItem('api-token', data.token);
        apiService.get('/user')
        .success( function(data, status, headers, config) {
          localStorage.setItem('email', data.email);
          localStorage.setItem('access', data.access);
          $location.path(localStorage.getItem('post-login-path') || '/home').replace();
        });
      })
      .error( function(data, status) {
        alert('error: ' + status);
      });
    },
    email: function() {
      return localStorage.getItem('email');
    },
    loggedIn: function() {
      return !! this.email();
    },
    logOut: function() {
      apiService.delete('/tokens');
      localStorage.removeItem('email');
      localStorage.removeItem('access');
      localStorage.removeItem('api-token');
    }
  };
}]);

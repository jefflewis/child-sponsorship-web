'use strict';

/*!
 * Child Sponsorship API Service
 * Version: 1.0.0
 *
 * Copyright 2014 Jeff Lewis
 */

angular.module('childSponsorshipWebApp')
  .factory('apiService', function($http) {

  // var API_LOCATION = 'http://localhost:5000/api/v1';
  var API_LOCATION =  config.production.api.url;

  var apiService = {
    token: function() {
      return localStorage.getItem('api-token');
    }
  };
  apiService.get = function(location, config) {
    return $http.get(API_LOCATION + location + '?token='+apiService.token(), config);
  };
  apiService.delete = function(location, config) {
    return $http.delete(API_LOCATION + location + '?token='+apiService.token(), config);
  };
  apiService.post = function(location, data, config) {
    var dataCopy = {};
    for( var key in data ) {
      dataCopy[key] = data[key];
    }
    dataCopy.token = apiService.token();
    return $http.post(API_LOCATION + location, dataCopy, config);
  };

  return apiService;
});
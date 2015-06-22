'use strict';

angular.module('childSponsorshipWebApp')
  .factory('User', function($resource) {
    var API_LOCATION =
    window.location.host === 'child-sponsorship-web.herokuapp.com' ?
      config.production.api.url : config.development.api.url;
    return $resource(API_LOCATION + '/users/:id', { id: '@id', token: localStorage.getItem('api-token')}, {
      update: {
        method: 'POST'
      }
    });
  });
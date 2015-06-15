'use strict';

angular
.module('childSponsorshipWebApp')
.controller('HomeCtrl', function($scope, authService, apiService) {
  $scope.email = authService.email();
  apiService.get('/data-only-users-can-see')
  .success( function(data, status) {
    $scope.data = data.data;
  } );
});

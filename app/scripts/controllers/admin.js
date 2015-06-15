'use strict';

angular
.module('childSponsorshipWebApp')
.controller('AdminCtrl', function($scope, authService, apiService) {
  $scope.email = authService.email();
  apiService.get('/data-only-admins-can-see')
  .success( function(data, status) {
    $scope.data = data.data;
  } );
});
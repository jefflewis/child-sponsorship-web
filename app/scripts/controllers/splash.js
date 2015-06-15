'use strict';

angular.module('childSponsorshipWebApp')
  .controller('SplashCtrl', function($scope, apiService, authService) {

  $scope.loggedIn = authService.loggedIn();

  apiService.get('/data-only-users-can-see')
  .success( function(data, status) {
    $scope.userData = data.data;
  } );

  apiService.get('/data-only-admins-can-see')
  .success( function(data, status) {
    $scope.adminData = data.data;
  } );
});
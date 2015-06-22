'use strict';

angular.module('childSponsorshipWebApp')
  .controller('LogoutCtrl', function($scope, $location, authService) {
  authService.logout();
  $location.path('/').replace();
});
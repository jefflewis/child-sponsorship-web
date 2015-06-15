'use strict';

angular.module('childSponsorshipWebApp')
  .controller('LogoutCtrl', function($scope, $location, authService) {
  authService.logOut();
  $location.path('/').replace();
});
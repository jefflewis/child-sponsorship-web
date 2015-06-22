'use strict';

angular.module('childSponsorshipWebApp')
  .controller('SplashController', function($scope, apiService, authService) {
  
  $scope.$on('login.success', function() {
    $scope.isLoggedIn = authService.isLoggedIn();
    $scope.user = authService.currentUser();
  });

  // Login success
  $scope.$on("user.success", function() {
    $scope.isLoggedIn = authService.isLoggedIn();
    $scope.user = authService.currentUser();
  });
});
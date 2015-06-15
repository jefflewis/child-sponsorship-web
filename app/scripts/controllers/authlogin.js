'use strict';

angular.module('childSponsorshipWebApp')
  .controller('LoginCtrl', function($scope, $rootElement, authService) {

  $scope.authenticate = function() {
    authService.checkCredentials($scope.email, $scope.password);
  };

  /* Handle browser autofill of login form */
  window.setTimeout( function() {
    $rootElement.find('input').checkAndTriggerAutoFillEvent();
  }, 200);
});
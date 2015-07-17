'use strict';

angular.module('childSponsorshipWebApp')
  .controller('LoginController', function($scope, $state, $rootElement, authService) {

  $scope.authenticate = function() {
    authService.login($scope.email, $scope.password);
  };

  /* Handle browser autofill of login form */
  window.setTimeout( function() {
    $rootElement.find('input').checkAndTriggerAutoFillEvent();
  }, 200);

  $scope.$root.$on('login.success', function() {
    $state.go('home');
  });
});
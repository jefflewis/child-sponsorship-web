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

  $scope.toastPosition = {
    bottom: true,
    top: false,
    left: false,
    right: false
  };

  $scope.getToastPosition = function() {
  return Object.keys($scope.toastPosition)
    .filter(function(pos) { return $scope.toastPosition[pos]; })
    .join(' ');
  };

  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
      .content('')
      .position($scope.getToastPosition())
      .hideDelay(0)
    );
  };

});
'use strict';

angular.module('childSponsorshipWebApp')
  .controller('SignupController', function($scope, $rootScope, $state, $rootElement, authService) {

  $scope.submitForAuthentication = function(name, email, password, passwordConfirmation) {
    if ( $scope.password === $scope.passwordConfirm) {
      authService.signup(name, email, password);
    } else {

      if ($scope.form.email.$invalid) {
        Materialize.toast('Invalid email address', 4000)
      }
      if (password !== passwordConfirmation) {
        Materialize.toast('Passwords do not match', 4000)
      }
    }
  };

  $scope.$on('login.success', function(e, user) {
    $state.go('home');
  });

  $scope.$on('login.failed', function(e, error) {
    $scope.error = error;
    console.info('error: ', error);
  });

  /* Handle browser autofill of login form */
  window.setTimeout( function() {
    $rootElement.find('input').checkAndTriggerAutoFillEvent();
  }, 200);
});

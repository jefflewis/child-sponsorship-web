'use strict';

angular.module('childSponsorshipWebApp')
  .controller('SignupController', function($scope, $rootElement, authService) {

  $scope.submit = function(email, password, confirm) {

    $scope.submitted = true;
      if ( password == confirm) {
        authService.signup($scope.email, $scope.password);
      } else {

        var message = '';

        if ($scope.form.email.$invalid) {
          message += 'Invalid email address';
        }

        if (password != confirm) {
          message += message == '' ? message : ', ';
          message += 'Passwords do not match';
        }

        $scope.error = {
          message: message
        };
      }
    };

  $scope.$root.$on('signup.success', function(e, user) {
    $scope.$apply(function() {
      $location.path('/login');
    });
  });

  $scope.$root.$on('signup.failed', function(e, error) {
    $scope.$apply(function() {
      $scope.error = error;
    });
  });


  /* Handle browser autofill of login form */
  window.setTimeout( function() {
    $rootElement.find('input').checkAndTriggerAutoFillEvent();
  }, 200);
});

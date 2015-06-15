'use strict';

/**
 * @ngdoc function
 * @name childSponsorshipWebApp.controller:MainCtrl
 * @description
 * # SignupCtrl
 * Controller of the childSponsorshipWebApp
 */
angular.module('childSponsorshipWebApp')
  .controller('SignupCtrl', function ($scope, $state, authService) {

$scope.submitted = false;

$scope.submit = function(email, password, confirm) {
  $scope.submitted = true;
  if ($scope.form.$valid && password == confirm) {
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

$scope.toastPosition = {
  bottom: false,
  top: true,
  left: true,
  right: true
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
    .hideDelay(6000)
  );
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
  });
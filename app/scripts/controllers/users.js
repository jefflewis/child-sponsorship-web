'use strict';

angular.module('childSponsorshipWebApp')
  .controller('UsersListController', function ($scope, $state, $window, User) {
    // Fetch all users. Issues a GET to /api/users
    $scope.users = User.query();
    $('.modal-trigger').leanModal();

    $scope.openModal = function (user) {
      $('#modalDelete').openModal();
      $scope.currentUser = user;
    };

    $scope.closeModal = function () {
      $('#modalDelete').closeModal();
    };
  })
  .controller('UsersViewController', function ($scope, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.id });
    $scope.user.$promise.then(function(data) {
        var json = data.children;
        $scope.children = JSON.parse(data.children);
    });
  })
  .controller('UsersCreateController', function ($scope, $rootScope, $state, $stateParams, User) {
    $scope.user = new User();
    $scope.addUser = function() {
      $scope.user.$save(function() {
        $rootScope.$broadcast("user.created");
        $state.go('viewUser', {id: $scope.user.id});
      });
    };
  })
  .controller('UsersEditController', function ($scope, $rootScope, $state, $stateParams, User, authService) {
    $scope.updateUser = function() {
      $scope.user.$update(function() {
        $rootScope.$broadcast("user.updated");
        if (authService.isAdmin()) {
          $state.go('viewUser', {id: $scope.user.id});
        }
        else {
          $state.go('home');
        }
      });
    };

    $scope.loadUser = function() {
      $scope.user = User.get({ id: $stateParams.id });
    };
    $scope.loadUser();
  })
  .controller('UsersChildrenController', function ($scope, $state, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.id });
    $scope.user.$promise.then(function(data) {
        var json = data.children;
        $scope.children = JSON.parse(data.children);
    });
  });
'use strict';

angular.module('childSponsorshipWebApp')
  .controller('UsersListController', function ($scope, $state, popupService, $window, User) {
    $scope.users = User.query(); //fetch all users. Issues a GET to /api/users

    $scope.deleteUser = function(user) { // Delete a user. Issues a DELETE to /users/:id
      if (popupService.showPopup('Really delete this?')) {
        user.$delete(function() {
          $rootScope.$broadcast("user.deleted");
          $state.go('users');
        });
      }
    };
  })
  .controller('UsersViewController', function ($scope, $stateParams, User) {
    //Get a single user. Issues a GET to /users/:id
    $scope.user = User.get({ id: $stateParams.id });
  })
  .controller('UsersCreateController', function ($scope, $rootScope, $state, $stateParams, User) {
    //create new user instance. Properties will be set via ng-model on UI
    $scope.user = new User();

    $scope.addUser = function() { //create a new user. Issues a POST to /users
      $scope.user.$save(function() {
        // On success go back to home i.e. users state.
        $rootScope.$broadcast("user.created");
        $state.go('users');
      });
    };
  })
  .controller('UsersEditController', function ($scope, $rootScope, $state, $stateParams, User) {
    $scope.updateUser = function() { //Update the edited user. Issues a POST to /api/users/:id
      $scope.user.$save(function() {
        $rootScope.$broadcast("user.updated");
        $state.go('users');
      });
    };

    $scope.loadUser = function() { //Issues a GET request to /api/users/:id to get a user to update
      $scope.user = User.get({ id: $stateParams.id });
    };  

    $scope.loadUser(); // Load a user which can be edited on UI
  })
  .controller('UsersChildrenController', function ($scope, $state, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.id });
  });
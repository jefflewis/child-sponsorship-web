'use strict';

angular.module('childSponsorshipWebApp')
  .controller('ChildrenListController', function ($scope, $state, popupService, $window, Child) {
    // Fetch all children. Issues a GET to /api/children
    $scope.children = Child.query(); 

    $scope.deleteChild = function(child) { // Delete a child. Issues a DELETE to /children/:id
      if (popupService.showPopup('Really delete this?')) {
        child.$delete(function() {
          $window.location.href = ''; //redirect to home
        });
      }
    };
  })
  .controller('ChildrenViewController', function ($scope, $stateParams, Child) {
    //Get a single child. Issues a GET to /children/:id
    $scope.child = Child.get({ id: $stateParams.id });
  })
  .controller('ChildrenCreateController', function ($scope, $state, $stateParams, Child) {
    //create new child instance. Properties will be set via ng-model on UI
    $scope.child = new Child();

    $scope.addChild = function() { //create a new child. Issues a POST to /children
      $scope.child.$save(function() {
        // On success go back to home i.e. children state.
        $state.go('children');
      });
    };
  })
  .controller('ChildrenEditController', function ($scope, $state, $stateParams, Child) {
    $scope.updateChild = function() { //Update the edited child. Issues a PUT to /api/children/:id
      $scope.child.$save(function() {
        $state.go('children'); // on success go back to home i.e. children state.
      });
    };

    $scope.loadChild = function() { //Issues a GET request to /api/children/:id to get a child to update
      $scope.child = Child.get({ id: $stateParams.id });
    };

    $scope.loadChild(); // Load a child which can be edited on UI
  })
  .controller('ChildrenSponsorContoller', function ($scope, $state, $stateParams, Child, apiService) {
    // Fetch all available Children (with no user_id)
    apiService.get('/children/available')
    .success( function (data, status, headers, config) {
      $scope.available = data;
    })
    .error( function(data, status) {
      alert('error: ' + status);
      $rootScope.$broadcast("children.available.failed", error);
    });
  });
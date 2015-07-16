'use strict';

angular.module('childSponsorshipWebApp')
.controller('ChildrenListController', function ($scope, $rootScope, $state, popupService, $window, Child) {
  // Fetch all children. Issues a GET to /api/children
  $scope.children = Child.query();
  console.info('children: ', $scope.children.$promise);

  $scope.deleteChild = function(child) { // Delete a child. Issues a DELETE to /children/:id
    bootbox.confirm("Are you sure?", function(result) {
      Example.show("Confirm result: "+result);
      if (result === true) {
        child.$delete(function() {
          $state.reload();
          Materialize.toast(child.name + 'has been removed', 4000)
        });
        Materialize.toast("'<span>Are you sure you want to delete this child?  </span><a class=&quot;waves-effect btn red&quot; ng-click=&quot;deleteChildConfirm(child)&quot;>Yes<a>", 5000);
      }
    });
  };
});
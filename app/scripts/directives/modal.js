'use strict';

angular.module('childSponsorshipWebApp').directive('modal-delete', function () {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    templateUrl: 'views/templates/modal.html',
    scope: {
      object: '='
    },
    // controllerAs: 'ChildrenListController',
    link: function(scope, element, attrs) {
      scope.deleteObject = function(object) {
        var name = object.name;
        object.$delete(function() {
          // $state.reload();
          Materialize.toast(name + ' has been deleted', 4000);
          window.location.reload();
        });
      };
    }
  };
});
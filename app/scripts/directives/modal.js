'use strict';

angular.module('childSponsorshipWebApp').directive('modal', function () {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'views/templates/modal.html',
    scope: {
      object: '='
    },
    link: function(scope, element, attrs) {
      scope.deleteObject = function(object) {
        console.info('child', object.name);
        var name = object.name;
        object.$delete(function() {
          Materialize.toast(name + ' has been deleted', 4000);
          window.location.reload()
        });
      };
    }
  };
});
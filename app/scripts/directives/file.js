'use strict';

/**
 * @ngdoc directive
 * @name file.directive:file
 * @description
 * # Apply file from input to scope
 */

angular.module('childSponsorshipWebApp')
.directive('file', function() {
    return {
      restrict: 'AE',
      scope: {
        file: '@'
      },
      link: function postLink($scope, element, attrs) {
        element.bind('change', function (event) {
          files = event.target.files;
          file = files[0];
          $scope.file = file;
          $scope.$parent.file = file;
          $scope.$apply();
        });
      }
    };
  });

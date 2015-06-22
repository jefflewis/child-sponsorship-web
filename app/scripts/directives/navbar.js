'use strict';

/**
 * @ngdoc directive
 * @name whosinApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('childSponsorshipWebApp')
.directive('navbar', function() {
    return {
      templateUrl: "/views/templates/navbar.html",
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      },
      controller: function($scope, $state, authService) {

        var admin = function () {
          console.log($scope.user.access)
          if ($scope.user.access >= 10) {
            return true;
          }
          return false;
        }

        $scope.$on('$viewContentLoaded', function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.user = authService.currentUser();
        });

        // Login success
        $scope.$on("user.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.user = authService.currentUser();
        });

        // Login success
        $scope.$on("login.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.user = authService.currentUser();
        });

        // Logout success
        $scope.$on("logout.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.user = authService.currentUser();
        });

        $scope.logout = function() {
          authService.logout();
        };

        $scope.children = function () {
          $state.go('children');
        };

        $scope.home = function () {
          $state.go('home');
        };

        $scope.users = function () {
          $state.go('users');
        };
      }
    };
  });
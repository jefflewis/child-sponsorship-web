'use strict';

/**
 * @ngdoc directive
 * @name childSponsorshipWebApp.directive:navbar
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
          $(".dropdown-button").dropdown();
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.isAdmin = authService.isAdmin();
          $scope.user = authService.currentUser();
        });

        // Login success
        $scope.$on("user.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.isAdmin = authService.isAdmin();
          $scope.user = authService.currentUser();
        });

        // Login success
        $scope.$on("login.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.isAdmin = authService.isAdmin();
          $scope.user = authService.currentUser();
        });

        // Logout success
        $scope.$on("logout.success", function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.isAdmin = authService.isAdmin();
          $scope.user = authService.currentUser();
          $state.go('home');
        });

        $scope.logout = function() {
          authService.logout();
        };

        $scope.children = function () {
          $state.go('children');
        };

        $scope.sponsor = function () {
          $state.go('sponsorChild');
        };

        $scope.home = function () {
          $state.go('home');
        };

        $scope.users = function () {
          $state.go('users');
        };

        $scope.userChildren =function () {
          $state.go('userChildren')
        }
      }
    };
  });

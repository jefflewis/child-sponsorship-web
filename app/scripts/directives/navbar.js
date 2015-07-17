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
          $(".button-collapse").sideNav();
          $(".dropdown-button").dropdown();
          $scope.setupUser();
        });

        // Login success
        $scope.$on("user.success", function() {
          $scope.setupUser();
        });

        // Login success
        $scope.$on("login.success", function() {
          $scope.setupUser();
        });

        // Logout success
        $scope.$on("logout.success", function() {
          $scope.setupUser();
          $state.go('home');
          $state.reload();
        });

        $scope.setupUser = function() {
          $scope.isLoggedIn = authService.isLoggedIn();
          $scope.isAdmin = authService.isAdmin();
          $scope.user = authService.currentUser();
        }

        $scope.logout = function() {
          authService.logout();
          $state.go('home');
          $state.reload();
        };
      }
    };
  });

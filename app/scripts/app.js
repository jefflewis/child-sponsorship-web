'use strict';

/**
 * @ngdoc overview
 * @name childSponsorshipWebApp
 * @description
 * # childSponsorshipWebApp
 *
 * Main module of the application.
 */
angular.module('childSponsorshipWebApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.gravatar',
  'ngFileUpload',
  'angularFileUpload',
  'ui.materialize'
  // 'angular-stripe'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  // Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  // Remove the header used to identify ajax call that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Set up states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/splash.html',
      controller: 'SplashController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupController'
    })
    // Children
    .state('children', {
      url: '/children',
      templateUrl: 'views/child/index.html',
      controller: 'ChildrenListController',
      resolve: {
        childrenResource: 'Child',
        children: function (childrenResource) {
          return childrenResource.query();
        }
      }
    })
    .state('viewChild', {
      url: '/children/:id/view',
      templateUrl: 'views/child/view.html',
      controller: 'ChildrenViewController'
    })
    .state('newChild', {
      url: '/children/new',
      templateUrl: 'views/child/new.html',
      controller: 'ChildrenCreateController'
    })
    .state('editChild', {
      url: '/children/:id/edit',
      templateUrl: 'views/child/edit.html',
      controller: 'ChildrenEditController'
    })
    .state('sponsorChild', {
      url: '/sponsor',
      templateUrl: 'views/child/available.html',
      controller: 'ChildrenAvailableContoller'
    })
    .state('sponsorChildPayment', {
      url: '/children/:id/sponsor',
      templateUrl: 'views/child/sponsor.html',
      controller: 'ChildrenSponsorContoller'
    })
    .state('addChildImages', {
      url: '/children/:id/photos',
      templateUrl: 'views/child/addPhotos.html',
      controller: 'ChildrenPhotosController'
    })
    // Users
    .state('users', {
      url: '/users',
    templateUrl: 'views/user/index.html',
      controller: 'UsersListController',
      resolve: {
        usersResource: 'User',
        users: function(usersResource) {
          return usersResource.query();
        }
      }
    })
    .state('viewUser', {
      url: '/users/:id/view',
      templateUrl: 'views/user/view.html',
      controller: 'UsersViewController'
    })
    .state('newUser', {
      url: '/users/new',
      templateUrl: 'views/user/new.html',
      controller: 'UsersCreateController'
    })
    .state('editUser', {
      url: '/users/:id/edit',
      templateUrl: 'views/user/edit.html',
      controller: 'UsersEditController'
    })
    .state('userChildren', {
      url: '/users/:id/children/view',
      templateUrl: 'views/user/children.html',
      controller: 'UsersChildrenController'
    });
})
.run(function ($state) {
  $state.go('home');
});

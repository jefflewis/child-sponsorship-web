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
  'ui.gravatar'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call  that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('home', {
      url: '/',
      templateUrl: 'views/splash.html',
      controller: 'SplashController'
    })
    .state('children', {
      url: '/children',
      templateUrl: 'partials/child/index.html',
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
      templateUrl: 'partials/child/view.html',
      controller: 'ChildrenViewController'
    })
    .state('newChild', {
      url: '/children/new',
      tempalteUrl: 'partials/child/new.html',
      controller: 'ChildrenCreateController'
    })
    .state('editChild', {
      url: '/children/:id/edit',
      templateUrl: 'partials/child/edit.html',
      controller: 'ChildrenEditController'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'partials/user/index.html',
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
      templateUrl: 'partials/user/view.html',
      controller: 'UsersViewController'
    })
    .state('newUser', {
      url: '/users/new',
      tempalteUrl: 'partials/user/new.html',
      controller: 'UsersCreateController'
    })
    .state('editUser', {
      url: '/users/:id/edit',
      templateUrl: 'partials/user/edit.html',
      controller: 'UsersEditController'
    });
})
.run(function ($state) {
  $state.go('login');
});
